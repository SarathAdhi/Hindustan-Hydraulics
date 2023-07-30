import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import axios from "../../lib/axios";
import { toast } from "react-hot-toast";

const TD = ({ children }) => (
	<td className="text-left border px-4 py-2">{children}</td>
);

const UserRenderer = ({ _roles = [], fetchUsers, ...user }) => {
	const [selectedRoles, setSelectedRoles] = useState("");

	const roles = user.roles.map((e) => e.role);

	async function handleRoleAssign() {
		try {
			await axios.post(
				`/auth/assign_role?${new URLSearchParams({
					email: user.email,
					role: selectedRoles,
				})}`
			);

			toast.success("Role added successfully");
			setSelectedRoles("");

			fetchUsers();
		} catch (error) {}
	}

	return (
		<tr className="even:bg-gray-200">
			<TD>
				{user?.first_name} {user?.last_name}
			</TD>
			<TD>{user.email}</TD>
			<TD>{user.mobile}</TD>
			<TD>{roles.join(", ")}</TD>
			<TD>
				<Select
					value={selectedRoles}
					onValueChange={(e) => setSelectedRoles(e)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select role" />
					</SelectTrigger>

					<SelectContent className="h-60">
						{_roles.map((e) => (
							<SelectItem
								key={e}
								value={e}
								disabled={roles.includes(e)}
							>
								{e}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</TD>
			<TD>
				<Button disabled={!selectedRoles} onClick={handleRoleAssign}>
					Assign
				</Button>
			</TD>
		</tr>
	);
};

export default UserRenderer;
