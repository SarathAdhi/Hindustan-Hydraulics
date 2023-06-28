import React from "react";
import PageLayout from "../../layouts/PageLayout";
import Image from "next/image";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "../../lib/axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useStore } from "../../utils/store";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();
  const { isAuth, getProfile } = useStore();

  if (isAuth) {
    const redirect = router.query?.redirect;

    router.replace(redirect || "/");
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      password: "",
    },
  });

  async function handleRegister(values) {
    try {
      const data = await axios.post("/auth/signup", values);

      setCookie("token", data?.tokens?.access_token);
      toast.success("Login successful");

      getProfile();
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <PageLayout title="Login" noLayout>
      <div className="pd flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-full sm:w-[1500px] grid grid-cols-1 sm:grid-cols-2 sm:border-2 rounded-md sm:bg-gray-200">
          <Image
            width={500}
            height={500}
            className="hidden sm:flex pd m-auto"
            src="/sphere-design-1.png"
            alt=""
          />

          <div className="p-4 sm:p-8 rounded-r-md sm:bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Image
                width={200}
                height={200}
                className="mx-auto h-20 w-20"
                src="/company-logo.png"
                alt="Your Company"
              />

              <h2 className="text-center font-bold leading-9 tracking-tight text-gray-900">
                Create an account
              </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm space-y-4">
              <form
                onSubmit={handleSubmit(handleRegister)}
                className="flex flex-col gap-4"
              >
                <Input
                  label="First name"
                  placeholder="Enter your first name"
                  required
                  {...register("first_name", { required: true })}
                />

                <Input
                  label="Last name"
                  placeholder="Enter your last name"
                  required
                  {...register("last_name", { required: true })}
                />

                <Input
                  type="number"
                  label="Mobile"
                  placeholder="Enter your mobile"
                  required
                  {...register("mobile", { required: true })}
                />

                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your name"
                  required
                  {...register("email", { required: true })}
                />

                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  required
                  {...register("password", { required: true })}
                />

                <Button
                  className="bg-[#9d2d42] hover:bg-[#9d2d42]/90"
                  type="submit"
                >
                  Register
                </Button>
              </form>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold leading-6 text-indigo-600 hover:underline hover:text-indigo-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
