import { useRouter } from "next/router";
import { useStore } from "../utils/store";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

function isRolePresent(subArray = [], mainArray = []) {
	const arr = subArray.filter((item) => mainArray.indexOf(item) !== -1);

	console.log({ arr });

	return arr.length === subArray.length;
}

export const withAuth =
	(Component, role = "", checkForAdmin = false) =>
	(pageProps) => {
		const router = useRouter();
		const { isAuth, permissions, isAdmin } = useStore();

		if (!isAuth) {
			const redirect = router.asPath;

			router.replace(`/auth/login?redirect=${redirect}`);

			return <></>;
		}

		if (checkForAdmin && !isAdmin) {
			toast.error(
				"You do not have permission to perform this action, please contact admin!"
			);

			if (history) history.back();
			else router.replace("/");

			return <></>;
		}

		let isRoleExist = isRolePresent(
			typeof role === "string" ? [role] : role,
			permissions
		);

		if (role && !isAdmin && !isRoleExist) {
			console.log("NOPE");

			toast.error(`You don't have permission to access this page`);
			// // if (history) history.back();
			// // else

			setTimeout(() => router.replace("/"), 1000);

			return <></>;
		}

		return <Component {...pageProps} />;
	};

withAuth.displayName = "withAuth";
