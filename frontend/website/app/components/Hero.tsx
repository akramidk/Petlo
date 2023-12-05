import { ChangeLangButton } from "./ChangeLangButton";
import { Logo } from "./Logo";

export const Hero = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#fff] w-[100%] p-[20px] pb-[0px]">
      <div className="flex justify-between items-center">
        <Logo />
        <ChangeLangButton lang={lang} value={t["HOME.CHANGE_LANG"]} />
      </div>
    </div>
  );
};
