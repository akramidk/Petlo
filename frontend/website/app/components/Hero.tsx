import { Logo } from "./Logo";

export const Hero = ({ t }: { t: { [key: string]: string } }) => {
  return (
    <div className="bg-[#E7E3D8] p-[20px] pb-[0px]">
      <Logo />
      <div>{t["HOME.CHANGE_LANG"]}</div>
    </div>
  );
};
