import Image from "next/image";

export const MoreThings = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#fff] p-[20px] md:p-[48px] lg:p-[72px]">
      <div className="text-center text-[#222] text-[24px] font-extrabold mb-[20px] md:mb-[48px] lg:mb-[52px] px-[12%]">
        {t["HOME.MORE_THINGS.TITLE"]}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[20px]">
        {Array.apply(null, Array(2)).map((_, index) => {
          return (
            <div
              key={index}
              className="#fff bg-[#f9f9f9] rounded-[16px] relative text-center p-[32px] sm:p-[52px] sm:space-y-[36px]"
            >
              <div className="h-[600px] relative">
                <Image
                  src={`/${lang}_other_${index + 1}.webp`}
                  alt="Petloer Testimonial"
                  objectFit="contain"
                  fill
                />
              </div>
              <div className="space-y-[2px] text-center">
                <div className="font-extrabold text-[20px] leading-[36px] sm:text-[24px] sm:leading-[40px] text-[#222] sm:px-[12px]">
                  {t[`HOME.MORE_THINGS.TITLE_${index + 1}`]}
                </div>

                <div className="font-medium text-[14px] leading-[26px] sm:text-[15.5px] sm:leading-[28px] text-[#777] sm:px-[12px]">
                  {t[`HOME.MORE_THINGS.DESCRIPTION_${index + 1}`]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
