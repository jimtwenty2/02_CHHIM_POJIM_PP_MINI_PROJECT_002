"use server";

import { signIn, signOut } from "../auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { AuthError } from "next-auth";
import { registerService } from "@/service/auth.service";

export async function loginAction(data) {
  const { email, password } = data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { ok: true };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "Something went wrong with the login." };
      }
    }
    return { error: "Internal Server Error. Please try again later." };
  }
}

export async function registerAction(requestData) {
  console.log("Action :", requestData);
  try {
    const { name, email, password, birthdate } = requestData;
    const { firstName, lastName } = splitFullName(name);
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      birthdate: birthdate,
    };
    const response = await registerService(user);
    if (!response.success) {
      return {
        success: false,
        message: response.message || "Registration failed",
        errors: response.errors || null,
      };
    }
    return {
      success: true,
      token: response.data.token,
      message: "Account created successfully",
      data: response.data,
    };
  } catch (error) {
    console.error("registerAction error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

function splitFullName(fullName) {
  const parts = fullName.trim().split(" ");

  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ") || "";

  return { firstName, lastName };
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}
