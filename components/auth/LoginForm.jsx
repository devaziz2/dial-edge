"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "../common/Input";
import Button from "../common/Button";
import Logo from "../ui/LogoPlaceholder";
import { BebasNeue } from "@/fonts/fonts";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Login successful");
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.user.id);
      router.push("/awaiting-approval");
      reset();
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.data?.message) {
        const errorMsg = error.response.data.message;

        if (
          errorMsg ===
          "Your account is pending approval. Please wait for admin approval."
        ) {
          localStorage.setItem("id", 3);
          router.push("/awaiting-approval");
        } else {
          toast.error(errorMsg);
        }
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1),0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.2)] transition-shadow duration-300"
      >
        <div className="flex justify-center mt-5">
          <Logo />
        </div>
        <h2
          className={`${BebasNeue.className} text-2xl flex justify-center font-bold mb-6 mt-10 text-dark`}
        >
          Login
        </h2>

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

        <Button text="Login" />

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </form>

      {/* React Hot Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
