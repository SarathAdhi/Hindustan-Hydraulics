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
	const [search, setSearch] = useState("");

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

	const filteredUsers = users?.filter((e) =>
		JSON.stringify(e).toLowerCase().includes(search.toLowerCase())
	);

	return (
		<PageLayout title="Admin Dashboard" className="space-y-4">
			<div>
				<input
					className="bg-white w-72 border border-black rounded-full px-4 py-2 focus:outline-none"
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			<DataTable
				isLoading={isLoading}
				columns={columns}
				data={filteredUsers}
			/>
		</PageLayout>
	);
};

export default withAuth(AdminPage, "", true);
