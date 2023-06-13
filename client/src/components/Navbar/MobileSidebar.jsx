import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Sidebar from "./Sidebar";

const MobileSidebar = ({ TriggerBtn, className }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className={className}>
        {TriggerBtn}
      </SheetTrigger>

      <SheetContent
        position="left"
        size="content"
        className="max-w-full w-60 p-0"
      >
        <Sidebar className="flex flex-col gap-4" />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
