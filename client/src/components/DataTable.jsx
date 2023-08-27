import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";

export function DataTable({
	columns,
	data,
	hidden = [],
	changes = "",
	isLoading = false,
}) {
	const [sorting, setSorting] = useState([]);
	let columnVisibility = {};

	hidden.forEach((e) => (columnVisibility[e] = false));

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
			columnVisibility,
		},
	});

	useEffect(() => {
		table.resetRowSelection();
	}, [changes]);

	if (isLoading)
		return (
			<div className="w-full grid place-content-center">
				<Loader2Icon size={30} className="animate-spin" />
			</div>
		);

	return (
		<div>
			<div className="grid !overflow-auto rounded-md border border-b-0 border-gray-500 bg-white">
				<Table className="w-full">
					<TableHeader>
						{table?.getHeaderGroups()?.map((headerGroup, i1) => (
							<TableRow key={headerGroup.id + i1}>
								{headerGroup.headers.map((header, i2) => {
									return (
										<TableHead
											className="text-black text-base font-bold flex-shrink-0 whitespace-nowrap"
											key={header.id + i2}
											style={{
												width:
													header.getSize() !== 150
														? header.getSize()
														: undefined,
											}}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table?.getRowModel()?.rows?.length ? (
							table.getRowModel().rows.map((row, i1) => (
								<TableRow
									key={row.id + i1}
									data-state={
										row.getIsSelected() && "selected"
									}
								>
									{row.getVisibleCells().map((cell, i2) => (
										<TableCell
											className="flex-shrink-0 whitespace-nowrap text-base font-medium"
											key={cell.id + i2}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-12"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between py-4">
				<div className="flex items-center gap-4">
					<p className="font-semibold">
						Page: {table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</p>

					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}
					>
						{[5, 10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>

				<div className="flex items-center justify-end space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>

					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
