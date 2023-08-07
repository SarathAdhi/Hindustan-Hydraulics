import { useRouter } from "next/router";
import { useStore } from "../utils/store";
import { toast } from "react-hot-toast";

export const withAuth =
	(Component, role = "", checkForAdmin = false) =>
	(pageProps) => {
		const router = useRouter();
		const { isAuth, roles, permissions, isAdmin } = useStore();

		if (!isAuth) {
			const redirect = router.asPath;

			router.replace(`/auth/login?redirect=${redirect}`);
		}

		if (checkForAdmin && !isAdmin) {
			toast.error(
				"You do not have permission to perform this action, please contact admin!"
			);

			if (history) history.back();
			else router.replace("/");

			return <></>;
		}

		const isRoleExist =
			roles?.some((e) => e === role || role === e) ||
			permissions?.some((e) => e === role || role === e);

		if (role && !isAdmin && !isRoleExist) {
			toast.error(
				`You don't have permission to access ${role.replace(
					"_",
					" "
				)} page`
			);

			// if (history) history.back();
			// else
			router.replace("/");

			return <></>;
		}

		return <Component {...pageProps} />;
	};

withAuth.displayName = "withAuth";
