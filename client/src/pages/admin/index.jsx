import React, { useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import axios from "../../lib/axios";
import { withAuth } from "../../hoc/withAuth";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { DataTable } from "../../components/DataTable";

const AdminPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState([]);

	async function fetchUsers() {
		setIsLoading(true);

		const res = await axios.get("/users");

		setIsLoading(false);
		setUsers(res);
	}

	useEffect(() => {
		fetchUsers();
	}, []);

	const columns = [
		{
			accessorKey: "first_name",
			header: () => <span>NAME</span>,
			cell: ({ row }) => {
				const first_name = row.original.first_name;
				const last_name = row.original.last_name;

				return `${first_name} ${last_name}`;
			},
		},
		{
			accessorKey: "email",
			header: () => <span>EMAIL</span>,
			cell: ({ row }) => {
				const email = row.original.email;

				return (
					<a href={`mailto:${email}`} className="text-blue-600">
						{email}
					</a>
				);
			},
		},
		{
			accessorKey: "action",
			header: () => <span>ACTION</span>,
			cell: ({ row }) => {
				const uuid = row.original.uuid;

				return (
					<Button asChild>
						<Link href={`/admin/${uuid}`}>Edit</Link>
					</Button>
				);
			},
		},
	];

	return (
		<PageLayout>
			<DataTable isLoading={isLoading} columns={columns} data={users} />
		</PageLayout>
	);
};

export default withAuth(AdminPage, "", true);
