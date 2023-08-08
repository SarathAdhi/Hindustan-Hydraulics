import React from "react";
import PageLayout from "../../layouts/PageLayout";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Input } from "../../components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/router";
import { withoutAuth } from "../../hoc/withoutAuth";

const ResetPasswordPage = () => {
	const { query } = useRouter();
	const token = query?.token;
	console.log({ token });

	const { register, handleSubmit, reset, watch } = useForm({
		defaultValues: {
			password: "",
			confirm_password: "",
		},
	});

	async function handleLogin(values) {
		try {
			// const data = await axios.post("/auth/login", values);
			reset();
			toast.success("Password reset successfully");
		} catch (error) {
			console.log({ error });
		}
	}

	const isPasswordMatching = watch("password") === watch("confirm_password");

	return (
		<PageLayout title="Reset Password" noLayout>
			<div className="pd w-full flex flex-col items-center gap-4 mt-20">
				<Image
					width={200}
					height={200}
					className="mx-auto h-20 w-20"
					src="/company-logo.png"
					alt="Your Company"
				/>

				<h2 className="text-center font-bold">Reset Your Password</h2>

				<form
					onSubmit={handleSubmit(handleLogin)}
					className="card w-full md:w-[500px] flex flex-col items-center gap-4"
				>
					<Input
						{...register("password", { required: true })}
						type="password"
						label="Password"
						placeholder="Enter your New Password"
						required
					/>

					<Input
						{...register("confirm_password", { required: true })}
						type="password"
						label="Confirm Password"
						placeholder="Re-Enter your New Password"
						required
					/>

					<Button type="submit" disabled={!isPasswordMatching}>
						Reset Password
					</Button>
				</form>

				<p className="text-center text-sm">
					<Link
						href="/auth/login"
						className="font-semibold text-indigo-600 hover:underline hover:text-indigo-500"
					>
						Know your password? Login
					</Link>
				</p>
			</div>
		</PageLayout>
	);
};

export default withoutAuth(ResetPasswordPage);
