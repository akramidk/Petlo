import localFont from "next/font/local";
import clsx from "clsx";

const chillax = localFont({ src: "../../public/chillax.ttf" });
export const Logo = () => {
  return (
    <div
      className={clsx("text-[#222] font-bold text-[20px]", chillax.className)}
    >
      petlo
    </div>
  );
};
