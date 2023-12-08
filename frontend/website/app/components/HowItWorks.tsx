import Image from "next/image";

export const HowItWorks = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#f9f9f9] p-[20px] md:p-[48px] lg:p-[72px]">
      <div className="text-center text-[#222] text-[24px] font-extrabold mb-[36px] px-[20%]">
        {t["HOME.HOW_IT_WORKS.TITLE"]}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">
        {Array.apply(null, Array(6)).map((_, index) => {
          return (
            <div
              key={index}
              className="#fff bg-[#fff] rounded-[16px] relative text-center p-[52px] space-y-[36px]"
            >
              <div className="h-[600px] relative">
                <Image
                  src={`/${lang}_autoship_${index + 1}.webp`}
                  alt="Petloer Testimonial"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              <div className="bg-[#fff] font-medium text-[15.5px] leading-[28px] text-[#777] px-[12px]">
                {t[`HOME.HOW_IT_WORKS.${index + 1}`]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
