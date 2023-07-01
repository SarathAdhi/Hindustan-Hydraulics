"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { Label } from "./label";

const Checkbox = React.forwardRef(
	({ label = "", name, className, ...props }, ref) => (
		<div className="w-full flex gap-2 items-center">
			<CheckboxPrimitive.Root
				ref={ref}
				name={name}
				id={name}
				className={cn(
					"peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
					className
				)}
				{...props}
			>
				<CheckboxPrimitive.Indicator
					className={cn(
						"flex items-center justify-center text-current"
					)}
				>
					<Check className="h-4 w-4" />
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>

			{label && (
				<Label className="capitalize" htmlFor={name}>
					{label}{" "}
					{props.required && <span className="text-red-500">*</span>}
				</Label>
			)}
		</div>
	)
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
