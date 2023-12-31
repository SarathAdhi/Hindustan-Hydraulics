import Image from "next/image";
import React from "react";
import { useStore } from "../../utils/store";
import { Label } from "../ui/label";
import Link from "next/link";
import { LogIn, ShoppingCart } from "lucide-react";
import { cn } from "../../lib/utils";
import { useRouter } from "next/router";

const pages = [
  {
    title: "Dashboard",
    items: [
      {
        name: "Inward",
        Icon: LogIn,
        href: "/inward",
      },
      {
        name: "Supply",
        Icon: ShoppingCart,
        href: "/supply",
      },
    ],
  },
  {
    title: "Forms",
    items: [
      {
        name: "Inward",
        Icon: LogIn,
        parentRoute: "/inward/",
        href: "/inward/material",
      },
      {
        name: "Supply",
        Icon: ShoppingCart,
        parentRoute: "/supply/",
        href: "/supply/order",
      },
    ],
  },
];

const Sidebar = ({
  className = "hidden lg:flex w-60 flex-shrink-0 flex-col gap-4 min-h-screen bg-white border-r",
}) => {
  const { pathname } = useRouter();

  const { isSidebarOpen, isAdmin } = useStore();

  console.log({ isAdmin });

  if (!isSidebarOpen) return <></>;

  return (
    <aside className={className}>
      <div className="pd">
        <Image
          width={300}
          height={300}
          className="w-10 h-10"
          src="/company-logo.png"
          alt="Company Logo"
        />
      </div>

      <div className="space-y-4">
        {pages.map(({ title, items }) => (
          <div key={title} className="space-y-2">
            <Label className="ml-4">{title}</Label>

            <div className="grid">
              {items.map(({ name, Icon, href, parentRoute }) => (
                <Link
                  key={name}
                  className={cn(
                    "hover:bg-[#ee657e] hover:text-white p-2 pl-6 flex items-center gap-2 text-base",
                    (parentRoute
                      ? pathname.includes(parentRoute)
                      : pathname === href) && "border-r-4 border-r-[#9d2d42]"
                  )}
                  href={href}
                >
                  <Icon size={18} />

                  <span>{name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
