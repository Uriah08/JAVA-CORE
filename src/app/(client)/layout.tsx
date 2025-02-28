"use client";

import Image from "next/image";
import React from "react";

import {
  BriefcaseBusiness,
  ChartArea,
  LogOut,
  ChevronLeft,
  Database,
} from "lucide-react";
import Link from "next/link";

import { signOut } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/ui/loading";

const sidebar = [
  {
    title: "Job Registry",
    icon: BriefcaseBusiness,
    link: "/client-job-registry",
  },
  {
    title: "Machine List",
    icon: Database,
    link: "/read-machine-list",
  },
  {
    title: "Analysis/Report",
    icon: ChartArea,
    link: "/client-analysis",
  }
];

interface Props {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [active, setActive] = React.useState("/client-job-registry");
  
  const [open, setOpen] = React.useState(true);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else if (status === "authenticated") {
      if (!session) {
        router.push("/");
      } else {
        setLoading(false);
      }
    } else if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, session, router]);

  return (
    <div>
      <div className="h-full w-screen flex bg-[#eee8e8]">
        <div
          className={`h-screen fixed p-7 bg-main flex flex-col z-20 justify-between min-w-[269px] ${
            open ? "" : "-left-[269px]"
          }`}
        >
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer absolute bg-main w-5 h-10 -right-[20px] top-1/2 -translate-y-1/2 rounded-e-lg flex items-center justify-center"
          >
            <ChevronLeft className={`text-white ${!open && "rotate-180"}`} />
          </div>
          <div className="w-full flex flex-col">
            <Link
              href={"/"}
              className="flex gap-2 items-center mt-2 mb-10 justify-center"
            >
              <Image
                src={"/logo.png"}
                width={200}
                height={200}
                alt="logo"
                className="size-12"
              />
              <div className="flex flex-col text-white space-y-0 text-sm font-medium">
                <h1>Java</h1>
                <h1>Condition Monitoring</h1>
              </div>
            </Link>
            <div className="flex flex-col w-full">
              <h1 className="text-[#FFADAD] font-medium text-sm">Java Core</h1>
              <div className="flex flex-col w-full mt-2 gap-1">
                {sidebar.map((item) => (
                  <React.Fragment key={item.link}>
                    {item.title === "Users" && (
                      <h1 className="text-[#FFADAD] font-medium text-sm mt-2">
                        Other
                      </h1>
                    )}
                    <Link
                      onClick={() => setActive(item.link)}
                      href={item.link}
                      key={item.link}
                      className={`flex gap-2 pl-8 relative py-3 rounded-lg duration-200 transition-all ${
                        active === item.link
                          ? "bg-white"
                          : "hover:bg-white hover:bg-opacity-20"
                      }`}
                    >
                      <item.icon
                        size={20}
                        className={`${
                          active === item.link ? "text-main" : "text-white"
                        }`}
                      />
                      <h1
                        className={`font-medium text-sm ${
                          active === item.link ? "text-main" : "text-white"
                        }`}
                      >
                        {item.title}
                      </h1>
                      {active === item.link && (
                        <div className="absolute bg-[#FFADAD] h-full -right-[28px] top-0 z-99 w-3 rounded-s-lg" />
                      )}
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => signOut()}
              className="flex gap-2 pl-8 relative py-3 rounded-lg duration-200 transition-all hover:bg-white hover:bg-opacity-20"
            >
              <LogOut size={20} className="text-white" />
              <h1 className="font-medium text-sm text-white">Sign Out</h1>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`h-full w-full ${
          open ? (loading ? "" : "lg:pl-[269px]") : ""
        }`}
      >
        {loading ? (
          <div className="w-full h-screen">
            <Loading />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default ClientLayout;
