import { useRouter } from "next/router";
import { useStore } from "../utils/store";
import { toast } from "react-hot-toast";

export const withAuth =
	(Component, role = "") =>
	(pageProps) => {
		const router = useRouter();
		const { isAuth, roles } = useStore();

		if (!isAuth) {
			const redirect = router.asPath;

			router.replace(`/auth/login?redirect=${redirect}`);
		}

		const isRoleExist = roles?.some((e) => e === role);

		if (role && !isRoleExist) {
			toast.error("You don't have permission to access this page");

			router.replace("/");

			return <></>;
		}

		return <Component {...pageProps} />;
	};

withAuth.displayName = "withAuth";
