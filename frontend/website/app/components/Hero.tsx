import { ChangeLangButton } from "./ChangeLangButton";
import { DownloadButton } from "./DownloadButton";
import { Logo } from "./Logo";
import { headers } from "next/headers";
import Image from "next/image";

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
    <div className="bg-[#fff] w-[100%] py-[20px] md:py-[36px] space-y-[36px]">
      <div
        dir="ltr"
        className="flex justify-between items-center px-[20px] md:px-[48px]"
      >
        <Logo />
        <ChangeLangButton lang={lang} value={t["HOME.CHANGE_LANG"]} />
      </div>

      <div className="px-[20px] md:px-[48px]">
        <div className="text-center space-y-[16px] md:space-y-[24px]">
          <div className="space-y-[12px]">
            <div className="text-[24px] md:text-[36px] text-[#222] font-extrabold content-['\n'] whitespace-pre">
              {t["HOME.HERO.BIG_TEXT"]}
            </div>

            <div className="font-medium text-[14px] md:text-[16px] text-[#777] leading-[22px] px-[12px]">
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

      {false && (
        <div className="relative h-[150px] overflow-x-hidden overflow-y-visible">
          <Image
            src="/dog-cat-image.webp"
            width={248}
            height={112}
            alt="Image of a Dog and Cat"
            className="absolute right-[-36px] bottom-0"
          />

          <Image
            src="/fish.webp"
            width={78}
            height={78}
            alt="Image of a Fish"
            className="absolute bottom-[-8px]"
          />
          <Image
            src="/bird.webp"
            width={78}
            height={78}
            alt="Image of a Bird"
            className="absolute top-[-56px]"
          />
        </div>
      )}
    </div>
  );
};
