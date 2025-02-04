import SignInForm from "@/components/container/authForm/SignInForm";
import React from "react";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="bg-[#EEE8E8] h-screen flex items-center justify-center">
      <Link href={"/"}>
        <CircleArrowLeft
          size={40}
          className="absolute top-7 left-7 text-main cursor-pointer hover:text-red-300"
        />
      </Link>
      <SignInForm />
    </div>
  );
};

export default SignIn;
