import { Logo } from "./Logo";
import { DownloadButton } from "./DownloadButton";
import { headers } from "next/headers";
import Image from "next/image";
import reactStringReplace from "react-string-replace";
import { ChangeLangButton } from "./ChangeLangButton";

export const Hero = ({
  t,
  lang,
  heroTextKey,
}: {
  t: { [key: string]: string };
  lang: "en" | "ar";
  heroTextKey: string;
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

        <ChangeLangButton lang={lang} t={t} />
      </div>

      <div className="text-[#0E333C] text-[30px] md:text-[36px] font-extrabold text-center justify-center mt-[52px] mb-[16px]">
        {reactStringReplace(t[heroTextKey], "br", (_, i) => (
          <br key={i} />
        ))}
      </div>

      <div className="inline-block mb-[36px]">
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

      <div className="h-[400px] overflow-hidden grid justify-center">
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
