"use client";

import { useSearchParams } from "next/navigation";
import FormLogin from "@/components/auth/form-login";
import { GithubButton, GoogleButton } from "@/components/social-button";
import { Suspense, useEffect, useState } from "react";

const LoginContent = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(searchParams.get("error"));
  }, [searchParams]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">
        Sign In to your account
      </h1>
      {error === "OAuthAccountNotLinked" && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">
            Account already used by another provider!
          </span>
        </div>
      )}
      <FormLogin />
      <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
        <p className="mx-4 mb-0 text-center font-semibold text-gray-600">OR</p>
      </div>
      <GoogleButton />
      <GithubButton />
    </div>
  );
};

const Login = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
};

export default Login;
