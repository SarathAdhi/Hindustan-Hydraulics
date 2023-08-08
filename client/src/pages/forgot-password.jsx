import React from "react";
import PageLayout from "../layouts/PageLayout";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Input } from "../components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { withoutAuth } from "../hoc/withoutAuth";
import axios from "../lib/axios";

const ForgotPasswordPage = () => {
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			email: "",
		},
	});

	async function handleForgotPassword(values) {
		try {
			await axios.post("/auth/forgotPassword", values);
		} catch (error) {
			console.log({ error });
		}
	}

	return (
		<PageLayout title="Forgot Password" noLayout>
			<div className="pd w-full flex flex-col items-center gap-4 mt-20">
				<Image
					width={200}
					height={200}
					className="mx-auto h-20 w-20"
					src="/company-logo.png"
					alt="Your Company"
				/>

				<div className="space-y-0.5">
					<h2 className="text-center font-bold">
						Forgot your Password?
					</h2>

					<p className="text-center text-sm">
						We'll send a link to your email to reset your password.
					</p>
				</div>

				<form
					onSubmit={handleSubmit(handleForgotPassword)}
					className="card w-full md:w-[500px] flex flex-col items-center gap-4"
				>
					<Input
						{...register("email", { required: true })}
						type="email"
						label="Email"
						placeholder="Enter your Email"
						required
					/>

					<Button type="submit">Send Reset Link</Button>
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

export default withoutAuth(ForgotPasswordPage);
