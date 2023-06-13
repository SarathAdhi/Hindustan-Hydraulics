import Head from "next/head";
import React from "react";
import { cn } from "../lib/utils";
import Topbar from "../components/Navbar/Topbar";
import Sidebar from "../components/Navbar/Sidebar";

const PageLayout = ({
  title = "",
  noLayout = false,
  showBasicLayout = false,
  className = "",
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {noLayout ? (
        children
      ) : (
        <main className="flex">
          {!showBasicLayout && <Sidebar />}

          <div className="w-full min-h-screen flex flex-col">
            <Topbar showBasicLayout={showBasicLayout} />

            <section className={cn("pd flex-1", className)}>{children}</section>
          </div>
        </main>
      )}
    </>
  );
};

export default PageLayout;
