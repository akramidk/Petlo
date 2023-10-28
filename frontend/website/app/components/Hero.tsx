import { Logo } from "./Logo";
import Link from "next/link";

export const Hero = ({
  t,
  lang,
}: {
  t: { [key: string]: string };
  lang: "en" | "ar";
}) => {
  return (
    <div
      dir="ltr"
      className="bg-[#E7E3D8] p-[20px] pb-[0px] space-y-[32px] text-center"
    >
      <div className="flex flex-row justify-between items-center">
        <Logo />

        <Link
          href={lang === "en" ? "/ar" : "/en"}
          className="text-[#444] text-[14px] font-semibold"
          replace
        >
          {t["HOME.CHANGE_LANG"]}
        </Link>
      </div>

      <div className="text-[#0E333C] text-[24px] font-extrabold px-[32px] leading-[40px]">
        {t["HOME.HERO_TEXT"]}
      </div>
    </div>
  );
};
