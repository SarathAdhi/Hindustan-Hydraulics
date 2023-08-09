import React, { useState } from "react";
import PageLayout from "../layouts/PageLayout";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { withoutAuth } from "../hoc/withoutAuth";
import axios from "../lib/axios";
import { useRouter } from "next/router";

const ForgotPasswordPage = () => {
	const { replace } = useRouter();

	const [redirectTimer, setRedirectTimer] = useState(0);
	const [isResetLinkSent, setIsResetLinkSent] = useState(false);

	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: "",
		},
	});

	async function handleForgotPassword(values) {
		try {
			await axios.post("/auth/forgotPassword", values);

			setIsResetLinkSent(true);

			let count = 0;
			const interval = setInterval(() => {
				if (count >= 5) {
					clearInterval(interval);
					replace("/auth/login");
				} else {
					count += 1;
					setRedirectTimer(count);
				}
			}, 1000);
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

				{isResetLinkSent && (
					<p className="font-medium text-center">
						Reset link sent to your email. Redirecting to login page
						in {5 - redirectTimer}
					</p>
				)}

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
