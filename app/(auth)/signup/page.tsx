"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput/FormInput";
import CustomButton from "@/components/CustomButton/CustomButton";
import { signupSchema, SignupFormData } from "@/lib/validations/signupSchema";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log("Signup data:", data);

    // simulate API call
    await new Promise((res) => setTimeout(res, 1500));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-200">
        <div className="mb-4 flex justify-center">
          <img src="/logo.png" alt="Carflex" className=" w-25" />
        </div>

        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-900">
          Create an account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <FormInput
            label="Name"
            placeholder="Enter your name"
            register={register("name")}
            error={errors.name}
          />

          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register("email")}
            error={errors.email}
          />

          <FormInput
            label="Phone"
            type="tel"
            placeholder="Enter your phone number"
            register={register("phone")}
            error={errors.phone}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register("password")}
            error={errors.password}
          />

          <CustomButton
            // type="submit"
            className="w-full bg-primary hover:bg-lightPrimary text-white py-2 rounded-lg text-center mt-2"
            // disabled={isSubmitting}
            img=""
            title="Sign up"
          >
            {/* {isSubmitting ? "Creating account..." : "Sign up"} */}
          </CustomButton>
        </form>

        {/* Footer */}
        <p className="mt-3 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
