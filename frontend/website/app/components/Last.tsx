import { Accordion } from "./Accordion";

export const Last = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#f9f9f9] p-[20px] md:p-[48px] lg:p-[72px] flex flex-col items-center justify-center space-y-[72px]">
      <div>
        <div className="text-center text-[#222] text-[24px] font-extrabold mb-[56px]">
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
