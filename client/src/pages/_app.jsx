import { useEffect, useState } from "react";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useStore } from "../utils/store";
import { useRouter } from "next/router";
import IPWhileListedErrorPage from "../components/IPWhileListedErrorPage";

function MyApp({ Component, pageProps }) {
	const [isLoading, setIsLoading] = useState(true);
	const { getProfile, isIpWhiteListed } = useStore();
	const router = useRouter();

	async function initilizeApp() {
		await getProfile();
		setIsLoading(false);
	}

	useEffect(() => {
		initilizeApp();
	}, [router.asPath]);

	if (isLoading) return <></>;
	if (isIpWhiteListed) return <IPWhileListedErrorPage />;

	return (
		<>
			<Component {...pageProps} />
			<Toaster position="top-center" reverseOrder={false} />
		</>
	);
}

export default MyApp;
