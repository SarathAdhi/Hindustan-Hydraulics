import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "../lib/axios";
import UserRenderer from "../modules/admin/UserRenderer";
import { withAuth } from "../hoc/withAuth";

const TH = ({ children }) => (
	<th className="text-left border px-4 py-2">{children}</th>
);

const AdminPage = () => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);

	async function fetchUsers() {
		const _roles = await axios.get("/auth/roles/");
		setRoles(_roles?.map((e) => e.role));

		const res = await axios.get("/auth/users");

		setUsers(res);
	}

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<PageLayout className="flex flex-col gap-2">
			<table>
				<thead>
					<tr>
						<TH>Name</TH>
						<TH>Email</TH>
						<TH>Mobile</TH>
						<TH>Current Roles</TH>
						<TH>Assign Roles</TH>
						<TH>Action</TH>
					</tr>
				</thead>

				<tbody>
					{users.map((user) => (
						<UserRenderer
							_roles={roles}
							fetchUsers={fetchUsers}
							{...user}
						/>
					))}
				</tbody>
			</table>
		</PageLayout>
	);
};

export default withAuth(AdminPage, "", true);
