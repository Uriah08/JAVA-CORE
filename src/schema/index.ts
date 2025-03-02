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
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters long",
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

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password must be 8 characters long",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const areaSchema = z.object({
  name: z.string().min(1, { message: "Area name is required" }),
});

export const equipmentGroupSchema = z.object({
  name: z.string().min(1, { message: "Equipment group name is required" }),
  areaId: z.string(),
});

export const equipmentNameSchema = z.object({
  name: z.string().min(1, { message: "Equipment name is required" }),
  groupId: z.string(),
});

export const componentSchema = z.object({
  name: z.string().min(1, { message: "Component name is required" }),
  equipmentNameId: z.string().optional(),
});

export const CreateRouteSchema = z.object({
  clientId: z.string().min(1, "Client name is required"),
  routeName: z.string().min(1, "Route name is required"),
  areaId: z.string().min(1, "Area is required"),
  equipmentNames: z
    .array(
      z.object({
        id: z.string().min(1, "Equipment name ID is required"),
        components: z.array(z.string()).optional(),
      })
    )
    .nonempty("At least one equipment name is required"),
});

export const analysisAndReportSchema = z.object({
  jobNo: z.string().min(1, { message: "Job number is required" }),
  client: z.string().min(1, { message: "Client is required" }),
  yearWeekNo: z.string().min(1, { message: "Year week number is required" }),
  inspectionRoute: z
    .string()
    .min(1, { message: "Inspection route is required" }),
  area: z.string().min(1, { message: "Area is required" }),
  reviewer: z.string(),
});

export const symbols = [
  {
    image: "N",
    label: "Normal",
  },
  {
    image: "M",
    label: "Moderate",
  },
  {
    image: "S",
    label: "Severe",
  },
  {
    image: "C",
    label: "Critical",
  },
  {
    image: "X",
    label: "Missed Points",
  },
];

export const routeComponentCommentSchema = z.object({
  routeComponentId: z.string(),
  severity: z.string().min(1, "Severity is required"),
  comment: z.string().min(1, "Comment is required"),
});

export const routeComponentRecommendationSchema = z.object({
  routeComponentId: z.string(),
  priority: z.string().min(1, "Priority is required"),
  recommendation: z.string().min(1, "Recommendation is required"),
});

export const routeComponentTemperatureSchema = z.object({
  routeComponentId: z.string(),
  temperature: z
    .number()
    .min(-100, { message: "Temperature cannot be below -100°C" })
    .max(1000, { message: "Temperature cannot exceed 1000°C" }),
});

export const routeComponentOilAnalysisSchema = z.object({
  routeComponentId: z.string(),
  analysis: z.enum(["Normal", "Contaminated", "Critical"], {
    errorMap: () => ({ message: "Choose a valid oil state!" }),
  }),
});

export const ClientEquipmentSchema = z.object({
  equiment: z.string().min(1, "Equipment is Required"),
});
