"use client";
import { API } from "@/api";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import CustomSelect from "@/components/ui/select";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function Home() {
  const router = useRouter();
  const { number } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    data.number = number;
    console.log(data);
    try {
      const res = await API.verifyOtp(data);
      if (res) {
        Cookies.set("token", res?.data?.data?.token);

        Cookies.set("id", res?.data?.data?.data?.userId);

        router.push("/");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`flex h-screen w-full items-center justify-center bg-[#111b21] `}
    >
      <div className="rounded-xl bg-[#343f46]  px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <h1 className="mb-2 text-2xl">Krlete Hain</h1>
            <p>An OTP has been sent to your number, please verify to proceed</p>
          </div>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-4 flex justify-center gap-4 text-lg">
              <Input
                name={"otp"}
                type={"number"}
                placeholder={"0000"}
                register={register}
                errors={errors}
              />
            </div>

            <div className="mb-4 text-lg"></div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <Button text={"Verify"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
