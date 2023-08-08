import React, { useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import Image from "next/image";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "../../lib/axios";
import { setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import { useStore } from "../../utils/store";
import { Checkbox } from "../../components/ui/checkbox";
import { withoutAuth } from "../../hoc/withoutAuth";

const LoginPage = () => {
	const { getProfile } = useStore();
	const [showPassword, setShowPassword] = useState(false);

	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function handleLogin(values) {
		try {
			const data = await axios.post("/auth/login", values);

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
					<div className="p-4 sm:p-8 rounded-l-md sm:bg-white">
						<div className="sm:mx-auto sm:w-full sm:max-w-sm">
							<Image
								width={200}
								height={200}
								className="mx-auto h-20 w-20"
								src="/company-logo.png"
								alt="Your Company"
							/>
							<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
								Login to your account
							</h2>
						</div>

						<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
							<form
								onSubmit={handleSubmit(handleLogin)}
								className="flex flex-col gap-4"
							>
								<Input
									{...register("email", { required: true })}
									type="email"
									label="Email"
									placeholder="Enter your Email"
									required
								/>

								<Input
									{...register("password", {
										required: true,
									})}
									type={showPassword ? "text" : "password"}
									label="Password"
									placeholder="Enter your password"
									required
								/>

								<Checkbox
									name="show_password"
									defaultChecked={showPassword}
									onCheckedChange={(e) => setShowPassword(e)}
									label="Show Password"
								/>

								<Button
									className="bg-[#9d2d42] hover:bg-[#9d2d42]/90"
									type="submit"
								>
									Login
								</Button>
							</form>

							<div className="mt-10">
								<p className="text-center text-sm">
									<Link
										href="/forgot-password"
										className="font-semibold text-indigo-600 hover:underline hover:text-indigo-500"
									>
										Forgot Password?
									</Link>
								</p>

								<p className="text-center text-sm text-gray-500">
									Don't have an account already?{" "}
									<Link
										href="/auth/register"
										className="font-semibold leading-6 text-indigo-600 hover:underline hover:text-indigo-500"
									>
										Register
									</Link>
								</p>
							</div>
						</div>
					</div>

					<Image
						width={500}
						height={500}
						className="hidden sm:flex pd m-auto"
						src="/sphere-design-1.png"
						alt=""
					/>
				</div>
			</div>
		</PageLayout>
	);
};

export default withoutAuth(LoginPage);
