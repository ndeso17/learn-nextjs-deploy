/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { RegisterSchema, SignInSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const signUpCredentials = async (
  prevState: {
    values?: Record<string, string>;
    error?: Record<string, string[]>;
  },
  formData: FormData
) => {
  // Convert FormData ke object
  const formValues = Object.fromEntries(formData.entries()) as Record<
    string,
    string
  >;

  // Validasi menggunakan Zod
  const validatedFields = RegisterSchema.safeParse(formValues);

  if (!validatedFields.success) {
    return {
      values: formValues,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, gender, email, password } = validatedFields.data;

  // **Tambahkan log untuk debug**
  console.log("Data yang diterima:", validatedFields.data);

  // **Cek jika ada field yang null**
  if (!name || !gender || !email || !password) {
    return {
      values: formValues,
      message: "Semua field harus diisi!",
    };
  }

  const hashedPassword = hashSync(password, 10);

  try {
    // **Cek apakah email sudah terdaftar**
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        values: formValues,
        error: { email: ["Email sudah terdaftar"] },
        // success: false,
      };
    }

    // **Tambahkan log sebelum create**
    console.log("Mendaftarkan user:", { name, email, gender });

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        gender,
      },
    });

    // redirect("/login");
    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      values: formValues,
      message: "Failed to register user",
    };
  }
};

export const signInCredentials = async (
  prevState:
    | {
        values: Record<string, string>;
        error: Record<string, string[]>;
        message: string;
      }
    | undefined,
  formData: FormData
) => {
  // Perbaikan: Gunakan nilai default jika prevState adalah undefined
  const currentState = prevState || { values: {}, error: {}, message: "" };

  // Ambil nilai input dari FormData
  const formValues = Object.fromEntries(formData.entries()) as Record<
    string,
    string
  >;

  // Validasi input menggunakan Zod
  const validatedFields = SignInSchema.safeParse(formValues);

  if (!validatedFields.success) {
    return {
      values: formValues,
      error: validatedFields.error.flatten().fieldErrors,
      message: "",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            values: formValues,
            error: {},
            message: "Invalid Credentials",
          };
        default:
          return {
            values: formValues,
            error: {},
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
};

export const handleSignOut = async () => {
  "use server";

  await signOut({ redirectTo: "/" });
};

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signInWithGithub() {
  await signIn("github", { redirectTo: "/dashboard" });
}
