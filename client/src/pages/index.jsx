import Link from "next/link";
import { withAuth } from "../hoc/withAuth";
import PageLayout from "../layouts/PageLayout";
import { useStore } from "../utils/store";
import { cn } from "../lib/utils";
import { Switch } from "../components/ui/switch";

const Home = () => {
	const { user: _user, isAdmin, permissions } = useStore();

	const toastLoadingState = true;

	const _rolesObject = {};

	permissions.forEach((e) => {
		const form = e.split("_")[0];
		const formName = e?.split("_")[1]?.split("-")[0];
		const action = e?.split("_")[1]?.split("-")[1];

		if (formName) {
			const formObj = _rolesObject[form] || {};
			const formNameObj = formObj[formName] || {};

			formNameObj[action || "create"] = {
				value: true,
				key: e,
			};

			_rolesObject[form] = { ...formObj, [formName]: formNameObj };
		}
	});

	const rolesValue = Object.entries(_rolesObject);

	return (
		<PageLayout className="flex flex-col gap-4">
			<div>
				<h3>{_user?.name}</h3>

				<Link
					className="text-xl text-blue-800 hover:underline"
					href={`mailto:${_user?.email}`}
				>
					{_user?.email}
				</Link>
			</div>

			<hr className="border-black" />

			<div className="space-y-2">
				<h3>Your Permissions</h3>

				<div className="w-full space-y-4">
					{isAdmin ? (
						<p>You are an ADMIN</p>
					) : (
						rolesValue.map(([form, _subForm]) => {
							const subForm = Object.entries(_subForm);

							return (
								<div key={form} className="space-y-2">
									<h5 className="uppercase">{form}</h5>

									<div
										className={cn(
											"bg-white grid gap-4 rounded-lg p-4",
											`grid-cols-${subForm.length}`
										)}
									>
										{subForm.map(
											([subFormName, _actions]) => {
												const actions =
													Object.entries(_actions);

												return (
													<fieldset
														key={form + subFormName}
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
																				isAdmin
																					? true
																					: value
																			}
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
						})
					)}
				</div>
			</div>
		</PageLayout>
	);
};

export default withAuth(Home);
