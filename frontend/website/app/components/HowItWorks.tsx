import Image from "next/image";

export const HowItWorks = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#f9f9f9] p-[20px] md:p-[48px] lg:p-[72px]">
      <div className="text-center text-[#222] text-[24px] font-extrabold mb-[20px] md:mb-[48px] lg:mb-[52px] px-[12%]">
        {t["HOME.HOW_IT_WORKS.TITLE"]}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px]">
        {Array.apply(null, Array(6)).map((_, index) => {
          return (
            <div
              key={index}
              className="#fff bg-[#fff] rounded-[16px] relative text-center p-[32px] sm:p-[52px] space-y-[12px] sm:space-y-[36px]"
            >
              <div className="h-[600px] relative">
                <Image
                  src={`/${lang}_autoship_${index + 1}.webp`}
                  alt="How It Work Image"
                  objectFit="contain"
                  fill
                />
              </div>
              <div className="font-medium text-[14.5px] leading-[26px] sm:text-[15.5px] sm:leading-[28px] text-[#777] sm:px-[12px]">
                {t[`HOME.HOW_IT_WORKS.${index + 1}`]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
