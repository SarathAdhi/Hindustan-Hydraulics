import React, { useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import { useRouter } from "next/router";
import axios from "../../lib/axios";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { withoutAuth } from "../../hoc/withoutAuth";

const VerifyEmailPage = () => {
	const { query, replace } = useRouter();
	const token = query?.token;

	const [isVerified, setIsVerified] = useState(false);
	const [isError, setIsError] = useState(false);

	async function verifyEmail() {
		try {
			await axios.post(`/auth/verifyEmail/${token}`);
			setIsVerified(true);

			setTimeout(() => replace("/auth/login"), 2000);
		} catch (error) {
			setIsVerified(false);
			setIsError(true);
		}
	}

	useEffect(() => {
		if (token) verifyEmail();
	}, [token]);

	return (
		<PageLayout
			title="Verify"
			className="flex flex-col items-center"
			showBasicLayout
		>
			<div className="mt-10">
				{isVerified && (
					<div>
						<h1 className="text-center font-bold text-green-800">
							Your email have been successfully verified.
						</h1>

						<p className="text-sm text-center font-medium">
							Re-directing to login page in 2 seconds...
						</p>
					</div>
				)}

				{isError && (
					<div className="flex flex-col items-center gap-2">
						<h1 className="text-center font-bold text-red-800">
							{"Something went wrong :("}
						</h1>

						<p className="text-center font-medium">
							{
								"- The reason might be because of invalid verify token."
							}
						</p>

						<div className="mt-5 space-x-2">
							<Button className="text-center">
								<Link href={`/auth/login`}>Login</Link>
							</Button>

							<Button className="text-center">
								<Link href={`/auth/register`}>Register</Link>
							</Button>
						</div>
					</div>
				)}
			</div>
		</PageLayout>
	);
};

export default withoutAuth(VerifyEmailPage);
