import { Accordion } from "./Accordion";

export const Last = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#f9f9f9] px-[20px] py-[56px] lg:py-[72px] md:px-[48px] lg:px-[72px] flex flex-col items-center justify-center space-y-[72px]">
      <div>
        <div className="text-center text-[#222] text-[24px] font-extrabold pb-[56px] lg:pb-[72px]">
          {t["HOME.LAST.TITLE"]}
        </div>

        <Accordion
          sections={
            t["HOME.LAST.COMMON_QUESTIONS"] as {
              title: string;
              items: {
                question: string;
                answer: string;
              }[];
            }[]
          }
          lang={lang}
        />
      </div>

      {false && (
        <div className="bg-[#fff] h-[52px] w-[100%] rounded-[16px]">dd</div>
      )}
    </div>
  );
};
