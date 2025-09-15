"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { EMAIL_REGEX } from "@/lib/constants";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation"

const DEFAULT_ERROR = {
  error: false,
  message: "",
};

const DEFAULT_LOAD = {
  isLoading: false,
  message: "Loading Icon false",
};

export default function LoginForm() {
  const [error, SetError] = useState(DEFAULT_ERROR);
  const [isLoading, setIsLoading] = useState(DEFAULT_LOAD);
  const router = useRouter();

  const validateForm = ({ email, password }) => {
    console.log("Email:", email, " - ", "Password:", password);
    if (email === "") {
      SetError({
        error: true,
        message: "Email is required",
      });
      return false;
    } else if (password === "") {
      SetError({
        error: true,
        message: "Password is required",
      });
      return false;
    } else if (!EMAIL_REGEX.test(email)) {
      SetError({
        error: true,
        message: "Email is not valid",
      });
      return false;
    }
    SetError(DEFAULT_ERROR);
    return true;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault(); //This will prevent the default form submission behavior

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (validateForm({ email, password })) {
      // Proceed with form submission or further processing
      console.log("Form is valid. Proceeding with submission...");
      //setIsLoading(true);
      setIsLoading({
        isLoading: true,
        message: "Loading Icon true",
      });
      //Pass the login data to the login API
      try {
        // const loginResponse = await fetch(
        //   "http://localhost:3000/api/v1/login",
        //   {
        //     method: "POST",
        //     header: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ email, password }),
        //   }
        // );

        await signIn.email(
          { email, password },
          {
            onSuccess: (ctx) => {
              console.log("Login successful", ctx);
              router.push("/admin");
            },
            onError: (ctx) => {
              SetError({
                error: true,
                message: ctx.error.message || "Login failed. Please try again!",
              });
            },
          }
        );
        // if (!loginResponse.ok) {
        //   const errorData = await loginResponse.json();
        //   SetError({
        //     error: true,
        //     message: errorData.message || "Login failed. Please try again!",
        //   });
        // } else {
        //   const loginData = await loginResponse.json();
        //   console.log("Login successful", loginData);
        // }
      } catch (error) {
        console.log(error);
        // Handle network or other errors
        SetError({
          error: true,
          message:
            error.message || "An unexpected error occurred. Please try again!",
        });
      } finally {
        //setTimeout(()=>{setIsLoading(DEFAULT_LOAD);},3000);   
        setIsLoading(DEFAULT_LOAD)     
      }
    } else {
      console.log("Form is invalid. Please correct the errors and try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitForm} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </div>
              <div className="flex justify-center">
                {error.error && (
                  <span className="text-red-600 text-xs text-center animate-pulse duration-700">
                    {error.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading.isLoading}//Disable/freeze the button when loading
                >
                  {isLoading.isLoading && <Loader2 className="animate-spin" />}
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
