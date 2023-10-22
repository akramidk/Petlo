import { Logo } from "./Logo";

export const Hero = ({ t }: { t: { [key: string]: string } }) => {
  return (
    <div
      dir="ltr"
      className="bg-[#E7E3D8] p-[20px] pb-[0px] space-y-[32px] text-center"
    >
      <div className="flex flex-row justify-between items-center">
        <Logo />
        <div className="text-[#444] text-[14px] font-semibold">
          {t["HOME.CHANGE_LANG"]}
        </div>
      </div>

      <div className="text-[#222] text-[24px] font-extrabold">
        Buy or Schedule Your <br /> Pets&apos; Needs
      </div>
    </div>
  );
};
