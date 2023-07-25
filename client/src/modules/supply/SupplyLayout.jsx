import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

const pages = [
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

const SupplyNavlinks = ({ className = "" }) => {
  const { pathname } = useRouter();

  return (
    <div className={cn("flex flex-wrap sm:grid grid-cols-4 gap-2", className)}>
      {pages.map(({ name, href }) => (
        <Button key={name} variant={pathname === href ? "" : "outline"} asChild>
          <Link className="text-center" href={href}>
            {name}
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default SupplyNavlinks;
