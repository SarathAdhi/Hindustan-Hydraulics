import { useRouter } from "next/router";
import { useStore } from "../utils/store";

export const withoutAuth = (Component) => (pageProps) => {
	const router = useRouter();
	const { isAuth } = useStore();

	if (isAuth) {
		const redirect = router.query?.redirect;

		router.replace(redirect || "/");

		return <></>;
	}

	return <Component {...pageProps} />;
};

withoutAuth.displayName = "withoutAuth";
