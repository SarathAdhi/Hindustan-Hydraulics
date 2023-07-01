import React from "react";
import { cn } from "../lib/utils";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { useRouter } from "next/router";

const pages = [
  {
    name: "Store",
    href: "/inward/store",
  },
  {
    name: "Security",
    href: "/inward/security",
  },
];

const InwardPageLayout = ({ className, children }) => {
  const { pathname } = useRouter();

  console.log({ pathname });

  return (
    <div className="space-y-4">
      <div className="max-w-full w-[500px] mx-auto">
        <div className="flex flex-wrap sm:grid grid-cols-2 gap-2">
          {pages.map(({ name, href }) => (
            <Button
              key={name}
              variant={pathname === href ? "" : "outline"}
              asChild
            >
              <Link className="text-center" href={href}>
                {name}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <div className={cn("", className)}>{children}</div>
    </div>
  );
};

export default InwardPageLayout;
