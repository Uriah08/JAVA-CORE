"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/ui/loading";

interface Props {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

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
      </div>
        {loading ? (
          <div className="w-full h-screen">
            <Loading />
          </div>
        ) : (
          children
        )}
    </div>
  );
};

export default ClientLayout;
