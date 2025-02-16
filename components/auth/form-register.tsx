"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUpCredentials } from "@/lib/actions";
import { RegisterButton } from "@/components/button";

const FormRegister = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(signUpCredentials, {
    values: {},
    error: {},
    success: undefined,
    message: undefined,
  });

  useEffect(() => {
    if (state?.success) {
      Swal.fire({
        title: "Registrasi Berhasil!",
        text: "Anda akan diarahkan ke halaman login.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        router.push("/login"); // Redirect setelah alert
      });
    } else if (state?.message) {
      Swal.fire({
        title: "Gagal Mendaftar!",
        text: state.message,
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Nama Anda"
          defaultValue={state.values?.name || ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <span className="text-sm text-red-500 mt-2">
          {state.error?.name?.[0]}
        </span>
      </div>

      <div>
        <label
          htmlFor="gender"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Gender
        </label>
        <select
          name="gender"
          defaultValue={state.values?.gender || ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        >
          <option value="" disabled>
            Pilih Gender
          </option>
          <option value="man">Laki-laki</option>
          <option value="woman">Perempuan</option>
        </select>
        <span className="text-sm text-red-500 mt-2">
          {state.error?.gender?.[0]}
        </span>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email Anda"
          defaultValue={state.values?.email || ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <span className="text-sm text-red-500 mt-2">
          {state.error?.email?.[0]}
        </span>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="********"
          defaultValue={state.values?.password || ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <span className="text-sm text-red-500 mt-2">
          {state.error?.password?.[0]}
        </span>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="********"
          defaultValue={state.values?.confirmPassword || ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <span className="text-sm text-red-500 mt-2">
          {state.error?.confirmPassword?.[0]}
        </span>
      </div>

      <RegisterButton />

      <p className="text-sm font-light text-gray-500">
        Already have an account?
        <Link href="/login">
          <span className="font-medium pl-1 text-blue-600 hover:text-blue-700">
            Sign In
          </span>
        </Link>
      </p>
    </form>
  );
};

export default FormRegister;
