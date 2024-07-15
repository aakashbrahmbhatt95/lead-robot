"use client";

import React from "react";
import Link from "next/link";

interface BreadcrumbsProps {
  path: string;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path, className }) => {
  const pathArray = path.split("/").filter((segment) => segment);

  return (
    <nav className={className} aria-label="breadcrumbs">
      <ul className="flex space-x-2">
        <li>
          <Link href="/">
            <span className="text-[#71717A] cursor-pointer dark:text-slate-200">
              Home
            </span>
          </Link>
          {pathArray.length > 0 && <span className="mx-2">{">"}</span>}
        </li>
        {pathArray.map((segment, index) => {
          const href = "/" + pathArray.slice(0, index + 1).join("/");
          const isLast = index === pathArray.length - 1;

          return (
            <li key={href} className="flex items-center">
              {!isLast ? (
                <>
                  <Link href={href}>
                    <span className="text-[#71717A] dark:text-slate-200 cursor-pointer capitalize">
                      {segment}
                    </span>
                  </Link>
                  <span className="mx-2">{">"}</span>
                </>
              ) : (
                <span className="text-[#3F3F46] dark:text-white capitalize">
                  {segment}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
