import { useRouter } from "next/router";
import { useStore } from "../utils/store";

export const withAuth = (Component) => (pageProps) => {
	const router = useRouter();
	const { isAuth } = useStore();

	if (!isAuth) {
		const redirect = router.asPath;

		router.replace(`/auth/login?redirect=${redirect}`);
	}

	return <Component {...pageProps} />;
};

withAuth.displayName = "withAuth";
