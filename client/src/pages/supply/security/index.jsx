import React, { useEffect } from "react";
import PageLayout from "../../../layouts/PageLayout";
import { useRouter } from "next/router";

const SecurityIndex = () => {
	const { replace } = useRouter();

	useEffect(() => {
		replace("/supply/security/counter");
	}, []);

	return <PageLayout></PageLayout>;
};

export default SecurityIndex;
