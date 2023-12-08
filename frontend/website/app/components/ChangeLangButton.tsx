"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const ChangeLangButton = ({
  lang,
  value,
}: {
  lang: "en" | "ar";
  value: string;
}) => {
  const pathname = usePathname();
  const newPathname = pathname.includes("/en")
    ? pathname.replace("/en", "/ar")
    : pathname.replace("/ar", "/en");

  return (
    <Link
      href={newPathname}
      className="text-[#444] text-[14px] font-semibold"
      replace
      locale={lang === "en" ? "ar" : "en"}
    >
      {value}
    </Link>
  );
};
