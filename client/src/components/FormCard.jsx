import React from "react";
import { cn } from "../lib/utils";
import { Separator } from "@radix-ui/react-select";

const FormCard = ({ label = "", className = "", children }) => {
  return (
    <div className="card shadow-none w-full grid gap-4">
      {label && <h3>{label}</h3>}

      <div className={cn("w-full flex flex-col items-center gap-4", className)}>
        {children}
      </div>

      {/* <Separator className="mt-2 w-full h-0.5 rounded-lg bg-gray-300" /> */}
    </div>
  );
};

export default FormCard;
