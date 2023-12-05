import { ChangeLangButton } from "./ChangeLangButton";
import { DownloadButton } from "./DownloadButton";
import { Logo } from "./Logo";
import { headers } from "next/headers";
import { Fragment } from "react";

export const Hero = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  const headersList = headers();
  const userAgent = headersList.get("user-agent");
  const isAndroid = userAgent?.includes("Android");
  const isiPhone = userAgent?.includes("iPhone");
  const downloadButtons: ("android" | "ios")[] = isAndroid
    ? ["android"]
    : isiPhone
    ? ["ios"]
    : ["ios", "android"];

  return (
    <div className="bg-[#fff] w-[100%] p-[20px] space-y-[36px]">
      <div dir="ltr" className="flex justify-between items-center">
        <Logo />
        <ChangeLangButton lang={lang} value={t["HOME.CHANGE_LANG"]} />
      </div>

      <div>
        <div className="text-center space-y-[16px]">
          <div className="space-y-[12px]">
            <div className="text-[24px] text-[#222] font-extrabold content-['\n'] whitespace-pre">
              {t["HOME.HERO.BIG_TEXT"]}
            </div>

            <div className="font-medium text-[14px] text-[#777] leading-[22px] px-[12px]">
              {t["HOME.HERO.TEXT"]}
            </div>
          </div>

          <div className="inline-block ">
            <div className="space-y-[4px] md:space-y-[0px] md:flex">
              {downloadButtons.map((os, index) => {
                return (
                  <div key={index} className="md:ml-[4px]">
                    <DownloadButton
                      type={os}
                      lang={lang}
                      firstText={
                        t[`HOME.DOWNLOAD.${os.toUpperCase()}_FIRST_TEXT`]
                      }
                      secondText={
                        t[`HOME.DOWNLOAD.${os.toUpperCase()}_SECOND_TEXT`]
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
