import { useEffect, useState } from "react";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useStore } from "../utils/store";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const { getProfile } = useStore();

  async function initilizeApp() {
    await getProfile();
    setIsLoading(false);
  }

  useEffect(() => {
    initilizeApp();
  }, []);

  if (isLoading) return <></>;

  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default MyApp;
