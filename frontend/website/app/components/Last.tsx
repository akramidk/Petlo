import Image from "next/image";
import { Accordion } from "./Accordion";

export const Last = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#f9f9f9] p-[20px] md:p-[48px] lg:p-[72px] flex flex-col items-center justify-center space-y-[20px]">
      <div>
        <div className="text-center text-[#222] text-[24px] font-extrabold mb-[56px]">
          Common Questions
        </div>

        <Accordion
          sections={
            t["HOME.COMMON_QUESTIONS"] as {
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
    </div>
  );
};
