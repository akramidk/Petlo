import { Logo } from "./Logo";

export const Hero = ({ t }: { t: { [key: string]: string } }) => {
  return (
    <div
      dir="ltr"
      className="flex flex-row justify-between items-center bg-[#E7E3D8] p-[20px] pb-[0px]"
    >
      <Logo />
      <div className="text-[#444] text-[14px] font-semibold">
        {t["HOME.CHANGE_LANG"]}
      </div>
    </div>
  );
};
