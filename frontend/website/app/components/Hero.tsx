import { ChangeLangButton } from "./ChangeLangButton";
import { Logo } from "./Logo";

export const Hero = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#fff] w-[100%] p-[20px] pb-[0px] space-y-[36px]">
      <div className="flex justify-between items-center">
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

          <div>sss</div>
        </div>
      </div>
    </div>
  );
};
