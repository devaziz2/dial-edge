"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "../common/Input";
import Button from "../common/Button";
import Logo from "../ui/LogoPlaceholder";
import { BebasNeue } from "@/fonts/fonts";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/signup`,
        {
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message || "Verification email sent successfully");
      reset();
    } catch (error) {
      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1),0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.2)]"
      >
        <div className="flex justify-center mt-5">
          <Logo />
        </div>
        <h2
          className={`${BebasNeue.className}  text-2xl font-bold mb-6 mt-10 flex justify-center text-dark`}
        >
          Join Us Today
        </h2>

        {/* First & Last Name in Row */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            register={register("firstName", {
              required: "First Name is required",
            })}
            error={errors.firstName?.message}
            icon="User"
          />

          <Input
            label="Last Name"
            type="text"
            register={register("lastName", {
              required: "Last Name is required",
            })}
            error={errors.lastName?.message}
            icon="User"
          />
        </div>

        <Input
          label="Email"
          type="email"
          icon="Mail"
          register={register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          icon="Lock"
          register={register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />

        <Button text="Sign Up" />

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </form>

      {/* React Hot Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
