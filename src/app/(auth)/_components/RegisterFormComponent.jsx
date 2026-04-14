"use client";

import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "@/action/auth.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterFormComponent() {
  const route = useRouter();
  const [submitError, setSubmitError] = useState("");

  const authSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email format"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required"),
    name: z.string().min(6, "Full Name must be at least 6 characters"),
    birthdate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Birthdate must be in format YYYY-MM-DD"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "John Cena",
      email: "johncena@example.com",
      password: "Koko@135795",
      birthdate: "",
    },
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data) => {
    console.log("From form : ", data);
    const response = await registerAction(data);
    console.log(response);
    if (response.success) {
      toast.success("Registerd Sucessful");
      route.push("/login");
    } else {
      setSubmitError(response.message);
      if(response.errors){
        toast.error(response.errors);
      }
    }
  };

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {submitError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-red-400">
          {submitError}
        </div>
      )}
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full name
        </label>
        <input
          type="text"
          {...register("name")}
          placeholder="Jane Doe"
          className={`mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2 ${
            errors.name
              ? "border-red-500 text-red-500"
              : "border-gray-300 text-black"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email")}
          placeholder="you@example.com"
          className={`mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2${
            errors.email
              ? "border-red-500 text-red-500"
              : "border-gray-300 text-black"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          placeholder="••••••••"
          className={`mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2${
            errors.password
              ? "border-red-500 text-red-500"
              : "border-gray-300 text-black"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Birthdate */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Birthdate
        </label>
        <input
          type="date"
          {...register("birthdate")}
          className={`mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2 ${
            errors.birthdate
              ? "border-red-500 text-red-500"
              : "border-gray-300 text-black"
          }`}
        />
        {errors.birthdate && (
          <p className="text-red-500 text-xs mt-1">
            {errors.birthdate.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="solid"
        className="w-full rounded-full bg-lime-400 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-lime-300"
      >
        Create account
      </Button>
    </form>
  );
}
