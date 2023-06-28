import React from "react";
import { cn } from "../lib/utils";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { useRouter } from "next/router";

const pages = [
  {
    name: "Order",
    href: "/supply/order",
  },
  {
    name: "Store",
    href: "/supply/store",
  },
  {
    name: "Billing",
    href: "/supply/billing",
  },
  {
    name: "Counter",
    href: "/supply/counter",
  },
  {
    name: "Security",
    href: "/supply/security",
  },
];

const SupplyPageLayout = ({ className, children }) => {
  const { pathname } = useRouter();

  console.log({ pathname });

  return (
    <div className="space-y-4">
      <div className="max-w-full w-[500px]  mx-auto">
        <div className="flex flex-wrap sm:grid grid-cols-5 gap-2">
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

export default SupplyPageLayout;
