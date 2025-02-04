import { z } from "zod";
import { prisma } from "@/lib/db";

export const findUserById = async (id: string) => {
  const user = prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const jobSchema = z.object({
  client: z.string().min(1, { message: "Client is required" }),
  area: z.string().min(1, { message: "Area is required" }),
  dateSurveyed: z.preprocess(
    (arg) => new Date(arg as string),
    z.date({
      required_error: "A date surveyed is required.",
    })
  ),
  jobNo: z.string().min(1, { message: "Job number is required" }),
  poNo: z.string().min(1, { message: "PO number is required" }),
  woNo: z.string().min(1, { message: "WO number is required" }),
  reportNo: z.string().min(1, { message: "Report number is required" }),
  jobDescription: z.string().min(1, { message: "Job description is required" }),
  method: z.string().min(1, { message: "Method is required" }),
  inspector: z.string().min(1, { message: "Inspector is required" }),
  inspectionRoute: z
    .string()
    .min(1, { message: "Inspection route is required" }),
  equipmentUse: z.string().min(1, { message: "Equipment use is required" }),
  dateRegistered: z.preprocess(
    (arg) => new Date(arg as string),
    z.date({
      required_error: "A date of register is required.",
    })
  ),
  yearWeekNo: z.string().min(1, { message: "Year week number is required" }),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters long",
    })
    .max(30, {
      message: "Username must be at most 30 characters long",
    }),
  email: z.string().email().min(5).max(50),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(20, {
      message: "Password must be at most 20 characters long",
    }),
});

export const loginSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(20, {
      message: "Password must be at most 20 characters long",
    }),
});

export const routeSchema = z.object({
  client: z.string().min(1, "Client is required"),
  route: z.string().min(1, "Route name is required"),
  droppedMachines: z.array(z.string()).optional(),
});
