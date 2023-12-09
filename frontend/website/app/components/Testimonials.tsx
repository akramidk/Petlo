import Image from "next/image";
import { DownloadButtons } from "./DownloadButtons";

export const Testimonials = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#fff] p-[20px] md:p-[48px] lg:p-[72px]">
      <div className="text-center text-[#222] text-[24px] font-extrabold mb-[20px] md:mb-[48px] lg:mb-[52px] px-[12%]">
        {t["HOME.TESTIMONIALS.TITLE"]}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-[20px]">
        {Array.apply(null, Array(3)).map((_, index) => {
          return (
            <div key={index} className="bg-[#fff] h-[700px] w-[100%] relative">
              <Image
                src={`/testimonial_${index + 1}.webp`}
                alt="Petloer Testimonial"
                objectFit="cover"
                fill
                className="rounded-[16px]"
              />
            </div>
          );
        })}

        <div className="bg-[#EBE3D5] rounded-[16px] p-[52px] md:h-[700px] w-[100%] flex items-center justify-center flex-col space-y-[16px]">
          <div className="text-[#222] font-bold text-[20px] text-center">
            {t["HOME.TESTIMONIALS.TEXT"]}
          </div>

          <DownloadButtons ignoreFlex t={t} lang={lang} borderColor="#e2d6c1" />
        </div>
      </div>
    </div>
  );
};
