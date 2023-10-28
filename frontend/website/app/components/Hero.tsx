import { Logo } from "./Logo";
import Link from "next/link";
import { DownloadButton } from "./DownloadButton";
import { headers } from "next/headers";
import Image from "next/image";
import reactStringReplace from "react-string-replace";

export const Hero = ({
  t,
  lang,
}: {
  t: { [key: string]: string };
  lang: "en" | "ar";
}) => {
  const headersList = headers();
  const userAgent = headersList.get("user-agent");
  const isAndroid = userAgent?.includes("Android");
  const isiPhone = userAgent?.includes("iPhone");

  return (
    <div
      dir="ltr"
      className="bg-[#E7E3D8] p-[20px] md:p-[32px] lg:px-[52px] pb-[0px] md:pb-[0px] text-center"
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

      <div
        className="space-y-[16px] mt-[52px] mb-[36px]"
        style={{ textAlign: "-webkit-center" }}
      >
        <div className="text-[#0E333C] text-[30px] md:text-[36px] font-extrabold text-center justify-center">
          {reactStringReplace(t["HOME.HERO_TEXT"], "br", (_, i) => (
            <br key={i} />
          ))}
        </div>

        {isAndroid || isiPhone ? (
          <DownloadButton
            type={isAndroid ? "android" : "ios"}
            text={t["COMMON.DOWNLOAD_NOW"]}
            lang={lang}
          />
        ) : (
          <div className="space-y-[8px] md:flex md:space-x-[8px] md:space-y-[0px] place-content-center">
            <DownloadButton
              type="ios"
              text={t["COMMON.DOWNLOAD_NOW"]}
              lang={lang}
            />
            <DownloadButton
              type="android"
              text={t["COMMON.DOWNLOAD_NOW"]}
              lang={lang}
            />
          </div>
        )}
      </div>

      <div
        className="h-[400px] overflow-hidden"
        style={{ textAlign: "-webkit-center" }}
      >
        <Image
          src={`/${lang}-screenshot.png`}
          width={250}
          height={505}
          alt="Screenshot of Petlo"
        />
      </div>
    </div>
  );
};
