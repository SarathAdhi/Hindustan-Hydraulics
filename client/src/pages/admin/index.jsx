import React, { useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import axios from "../../lib/axios";
import { withAuth } from "../../hoc/withAuth";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Loader } from "lucide-react";

const AdminPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);

	async function fetchUsers() {
		setIsLoading(true);

		const _roles = await axios.get("/roles");
		setRoles(_roles?.map((e) => e.role));

		const res = await axios.get("/users");

		setIsLoading(false);
		setUsers(res);
	}

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<PageLayout>
			{isLoading ? (
				<div className="grid place-content-center">
					<Loader size={40} className="animate-spin" />
				</div>
			) : (
				<div className="grid grid-cols-4 gap-4">
					{users.map((user) => (
						<div className="p-4 flex flex-col items-start gap-4 bg-white rounded-lg shadow-md duration-200 hover:shadow-lg">
							<div className="">
								<h4>
									{user?.first_name} {user?.last_name}
								</h4>

								<a
									href={`mailto:${user.email}`}
									className="text-blue-600"
								>
									{user.email}
								</a>
							</div>

							<hr className="w-full" />

							<Button asChild>
								<Link href={`/admin/${user.uuid}`}>Edit</Link>
							</Button>
						</div>
					))}
				</div>
			)}
		</PageLayout>
	);
};

export default withAuth(AdminPage, "", true);
