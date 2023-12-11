import { Accordion } from "./Accordion";
import { DownloadButtons } from "./DownloadButtons";

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

      <div className="bg-[#F8DFD4] rounded-[16px] px-[52px] py-[92px] w-[100%] lg:w-[800px] flex items-center justify-center flex-col space-y-[24px]">
        <div className="text-[#222] font-bold text-[20px] text-center">
          {t["HOME.LAST.CTA"]}
        </div>

        <DownloadButtons t={t} lang={lang} borderColor="#edd2c6" />
      </div>
    </div>
  );
};
