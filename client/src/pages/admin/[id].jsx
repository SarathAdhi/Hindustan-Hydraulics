import React, { useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import axios from "../../lib/axios";
import { withAuth } from "../../hoc/withAuth";
import { Loader } from "lucide-react";
import { useRouter } from "next/router";
import { Switch } from "../../components/ui/switch";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { toast } from "react-hot-toast";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";

const AdminPage = () => {
	const { query } = useRouter();
	const uuid = query?.id;

	const viewTab = query?.tab || "permanent";

	const [isLoading, setIsLoading] = useState(true);
	const [toastLoadingState, setToastLoadingState] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState("");
	const [timeSelector, setTimeSelector] = useState({
		hours: 0,
		minutes: 0,
	});
	const [user, setUser] = useState(null);
	const [roles, setRoles] = useState([]);

	async function fetchUser(setLoader = true) {
		if (setLoader) setIsLoading(true);

		const _roles = await axios.get("/roles");
		setRoles(_roles?.map((e) => e.role));

		try {
			const res = await axios.get(`/users/${uuid}`);

			setUser(res);
		} catch (error) {}

		if (setLoader) setIsLoading(false);
	}

	useEffect(() => {
		if (uuid) fetchUser();
	}, [uuid]);

	const _rolesObject = {};
	const isAdmin = user?.roles.some((x) => x?.role === "admin");

	const isAdminType = user?.roles.find((x) => x?.role === "admin")?.type;
	const isViewDashboard = user?.roles.find(
		(x) => x?.role === "view-dashboard"
	)?.type;

	roles.forEach((e) => {
		const form = e.split("_")[0];
		const formName = e?.split("_")[1]?.split("-")[0];
		const action = e?.split("_")[1]?.split("-")[1];

		if (formName) {
			const formObj = _rolesObject[form] || {};
			const formNameObj = formObj[formName] || {};
			const type = user?.roles.find((x) => x?.role === e)?.type;

			formNameObj[action || "create"] = {
				value: isAdmin
					? isAdmin
					: user?.roles?.some((x) => x?.role === e),
				key: e,
				type,
			};

			_rolesObject[form] = { ...formObj, [formName]: formNameObj };
		}
	});

	const rolesValue = Object.entries(_rolesObject);

	async function handleRoleAssignment(value, role) {
		setToastLoadingState(true);

		if (viewTab === "permanent") {
			await axios.post(
				`/auth/${value ? "assign_role" : "remove_role"}?email=${
					user.email
				}&role=${role}`
			);
		} else if (viewTab === "temporary") {
			if (value) {
				setIsModalOpen(role);
			} else {
				await axios.post(
					`/auth/remove_role?email=${user.email}&role=${role}`
				);
			}
		}

		setToastLoadingState(false);
	}

	return (
		<PageLayout>
			{isLoading ? (
				<div className="grid place-content-center">
					<Loader size={40} className="animate-spin" />
				</div>
			) : !user ? (
				<h3>User not found</h3>
			) : (
				<div className="flex flex-col gap-4">
					<div className="flex flex-col items-start gap-4">
						<h2>
							{user?.first_name} {user?.last_name}
						</h2>

						<div className="space-x-1">
							<a
								href={`mailto:${user.mobile}`}
								className="pr-2 text-blue-600"
							>
								{user.mobile}
							</a>

							<strong>&#183;</strong>

							<a
								href={`mailto:${user.email}`}
								className="pl-2 text-blue-600"
							>
								{user.email}
							</a>
						</div>
					</div>

					<hr className="w-full" />

					<div className="grid place-items-start gap-4">
						<div className="border border-black bg-gray-300 p-1 rounded-md flex items-center gap-1">
							<Button
								variant={
									viewTab === "permanent"
										? "success"
										: "ghost"
								}
								className="py-1 px-4 h-auto"
								asChild
							>
								<Link
									href={`/admin/${user.uuid}?tab=permanent`}
								>
									Permanent
								</Link>
							</Button>

							<Button
								variant={
									viewTab === "temporary"
										? "success"
										: "ghost"
								}
								className="py-1 px-4 h-auto"
								asChild
							>
								<Link
									href={`/admin/${user.uuid}?tab=temporary`}
								>
									Temporary
								</Link>
							</Button>
						</div>

						<div className="bg-white rounded-lg p-4 w-full flex items-center justify-between gap-4">
							<div>
								<h6>Make Admin</h6>
							</div>

							<Switch
								disabled={toastLoadingState}
								checked={
									viewTab === "permanent"
										? isAdminType === "permanent"
										: isAdminType === "temp"
								}
								onCheckedChange={(e) => {
									handleRoleAssignment(e, "admin");
									fetchUser(false);
								}}
							/>
						</div>

						<div className="bg-white rounded-lg p-4 w-full flex items-center justify-between gap-4">
							<div>
								<h6>View Dashboard</h6>
							</div>

							<Switch
								disabled={toastLoadingState}
								checked={
									viewTab === "permanent"
										? isViewDashboard === "permanent"
										: isViewDashboard === "temp"
								}
								onCheckedChange={(e) => {
									handleRoleAssignment(e, "view-dashboard");
									fetchUser(false);
								}}
							/>
						</div>

						<div className="w-full space-y-4">
							{rolesValue.map(([form, _subForm]) => {
								const subForm = Object.entries(_subForm);

								return (
									<div key={form} className="space-y-2">
										<h4 className="uppercase">{form}</h4>

										<div
											className={cn(
												"bg-white grid gap-4 rounded-lg p-4",
												`grid-cols-${subForm.length}`
											)}
										>
											{subForm.map(
												([subFormName, _actions]) => {
													const actions =
														Object.entries(
															_actions
														);

													return (
														<fieldset
															key={
																form +
																subFormName
															}
															className="p-4 pt-2 border-2 rounded-lg"
														>
															<legend className="px-2 uppercase font-bold">
																{subFormName}
															</legend>

															<div className="space-y-2">
																{actions.map(
																	([
																		actionName,
																		{
																			key,
																			value,
																			type,
																		},
																	]) => (
																		<div
																			key={
																				key
																			}
																			className="flex items-center justify-between gap-4"
																		>
																			<p className="capitalize">
																				{
																					actionName
																				}
																			</p>

																			<Switch
																				disabled={
																					toastLoadingState
																				}
																				checked={
																					viewTab.includes(
																						type
																					)
																						? value
																						: false
																				}
																				onCheckedChange={(
																					e
																				) => {
																					if (
																						viewTab ===
																						"permanent"
																					) {
																						const callFn =
																							handleRoleAssignment(
																								e,
																								key
																							);

																						toast.promise(
																							callFn,
																							{
																								loading: `${
																									e
																										? "Assigning"
																										: "Unassigning"
																								} role...`,
																								success:
																									(
																										<p className="capitalize">
																											{`${subFormName}-${actionName}`}{" "}
																											role{" "}
																											{e
																												? "assigned"
																												: "unassigned"}
																										</p>
																									),
																								error: (
																									<p>
																										Something
																										went
																										wrong.
																									</p>
																								),
																							}
																						);
																					} else {
																						handleRoleAssignment(
																							e,
																							key
																						);
																					}

																					fetchUser(
																						false
																					);
																				}}
																			/>
																		</div>
																	)
																)}
															</div>
														</fieldset>
													);
												}
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Temporary Roles</DialogTitle>
					</DialogHeader>

					<form
						onSubmit={async (e) => {
							e.preventDefault();
							const toastId = toast.loading(
								"Assigning temporary role..."
							);

							const duration =
								timeSelector.hours * 60 + timeSelector.minutes;

							await axios.post(
								`/roles/create_temp?email=${user.email}`,
								{
									role: isModalOpen,
									duration,
								}
							);

							toast.dismiss(toastId);
							fetchUser(false);
							setIsModalOpen(false);
						}}
						className="grid gap-4 py-4"
					>
						<div className="grid grid-cols-2 gap-2">
							<Input
								label="Hours"
								value={timeSelector.hours}
								onChange={(e) =>
									setTimeSelector({
										...timeSelector,
										hours: parseInt(e.target.value),
									})
								}
								type="number"
								placeholder="hours"
							/>

							<Input
								label="Minutes"
								value={timeSelector.minutes}
								onChange={(e) =>
									setTimeSelector({
										...timeSelector,
										minutes: parseInt(e.target.value),
									})
								}
								type="number"
								placeholder="minutes"
								min={0}
								max={60}
							/>
						</div>

						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</PageLayout>
	);
};

export default withAuth(AdminPage, "", true);
