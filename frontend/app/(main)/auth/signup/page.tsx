"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import {
  EmailSchema,
  emailSchema,
  otpSchema,
  OTPSchema,
} from "@/lib/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const emailForm = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<OTPSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const {
    formState: { isSubmitting },
  } = emailForm;

  const sendSignupOtp = async (data: EmailSchema) => {
    try {
      setEmail(data.email);

      const res = await api.post("/auth/signup", data);

      if (res.data?.data?.next) {
        setStep("otp");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const verifyOtp = async (data: OTPSchema) => {
    try {
      const res = await api.post("/auth/verify-otp", {
        email,
        otp: data.otp,
      });

      const token = res.data.data.token;
      const user = res.data.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/");
      console.log("Logged in:", user);
    } catch (err: any) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8  ">
      <h2 className="  text-center mb-8">
          Get Started
        </h2>
        {step === "email" && (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(sendSignupOtp)}
              className="space-y-6"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isSubmitting}
                type="submit"
            className="w-full py-5 bg-THREE  "
              >
                {isSubmitting ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          </Form>
        )}

        {step === "otp" && (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(verifyOtp)}
              className="space-y-6"
            >
              <p className="text-sm text-muted-foreground">
                We sent a 6-digit OTP to{" "}
                <span className="font-medium text-ONE">{email}</span>
              </p>

              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter OTP</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="123456"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit"     className="w-full py-5 bg-THREE  ">
                Verify & Create Account
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
