import Image from "next/image";

export const MoreThings = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#fff] p-[20px] md:p-[48px] lg:p-[72px]">
      <div className="text-center text-[#222] text-[24px] font-extrabold mb-[36px] px-[20%]">
        {t["HOME.HOW_IT_WORKS.TITLE"]}
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
                  src={`/${lang}_autoship_${index + 1}.webp`}
                  alt="Petloer Testimonial"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              <div className="font-medium text-[14px] leading-[26px] sm:text-[15.5px] sm:leading-[28px] text-[#777] sm:px-[12px]">
                {t[`HOME.HOW_IT_WORKS.${index + 1}`]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
