import { ChangeLangButton } from "./ChangeLangButton";
import { Logo } from "./Logo";
import Image from "next/image";
import { DownloadButtons } from "./DownloadButtons";

export const Hero = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#fff] w-[100%] py-[20px] md:py-[36px] space-y-[36px]">
      <div className="flex justify-between items-center px-[20px] md:px-[48px] lg:px-[72px] xl:px-[92px]">
        <Logo />
        <ChangeLangButton lang={lang} value={t["HOME.CHANGE_LANG"]} />
      </div>

      <div className="px-[20px] md:px-[48px] lg:px-[72px] xl:px-[92px]">
        <div className="text-center lg:text-start space-y-[16px] md:space-y-[24px]">
          <div className="space-y-[12px]">
            <div className="text-[24px] md:text-[36px] text-[#222] font-extrabold content-['\n'] whitespace-pre">
              {t["HOME.HERO.BIG_TEXT"]}
            </div>

            <div className="font-medium text-[14px] md:text-[16px] text-[#777] leading-[22px] md:leading-[26px] px-[12px] lg:px-[0px] lg:w-[50%] xl:w-[40%]">
              {t["HOME.HERO.TEXT"]}
            </div>
          </div>

          <DownloadButtons t={t} lang={lang} borderColor="#eeeeee" />
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
