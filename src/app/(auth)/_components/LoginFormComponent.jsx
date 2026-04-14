"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "@/action/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginFormComponent() {
  const router = useRouter();
  const authSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email format"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required"),
  });

  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "johncena@example.com",
      password: "Koko@135795",
    },
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data) => {
    const response = await loginAction(data);
    console.log("Response : ", response);
    if (response.ok) {
      toast.success("Sucessful");
      localStorage.setItem("token", response.token);    
      router.push("/");
    } else {
      setSubmitError(response.error);
    }
  };

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {submitError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-red-400">
          {submitError}
        </div>
      )}

      <div>
        <label
          htmlFor="login-email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className={`mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2 text-black ${
            errors.email
              ? "border-red-500 text-red-500"
              : "border-gray-300 text-black"
          }`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="login-password"
          type="text"
          autoComplete="current-password"
          {...register("password")}
          className={`text-black mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2${
            errors.password
              ? "border-red-500 text-red-500"
              : "border-gray-300 text-black"
          }`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="solid"
        className="w-full rounded-full bg-lime-400 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-lime-300"
      >
        Sign in
      </Button>
    </form>
  );
}
