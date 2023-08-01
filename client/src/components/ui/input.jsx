import * as React from "react";
import { cn } from "../../lib/utils";
import { Label } from "./label";

const Input = React.forwardRef(
	(
		{
			label = "",
			name,
			className,
			containerClassName = "",
			type,
			...props
		},
		ref
	) => {
		return (
			<div
				className={cn("w-full flex flex-col gap-2", containerClassName)}
			>
				{label && (
					<Label className="capitalize" htmlFor={name}>
						{label}{" "}
						{props.required && (
							<span className="text-red-500">*</span>
						)}
					</Label>
				)}

				<input
					{...{ name, id: name }}
					type={type}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
