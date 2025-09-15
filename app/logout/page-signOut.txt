"use client";

import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function LogoutPage() {
  const testUserSignup = async () => {
    await signUp.email({
      email: "dilinidil99@gmail.com",
      password: "Dilini@123",
      name: "Dilini",
      image: undefined,
    });
  };
  return (
    <div className="flex justify-center my-12">
      <Button onClick={() => testUserSignup()}>Create Test User</Button>
    </div>
  );
}
