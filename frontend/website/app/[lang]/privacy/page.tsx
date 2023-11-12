import ReactMarkdown from "react-markdown";
import { getTranslation } from "@/app/utils/getTranslation";

const Privacy = async ({
  params: { lang },
}: {
  params: { lang: "en" | "ar" };
}) => {
  const t = (await getTranslation(lang)) as any;

  return (
    <div className="bg-[#fff] p-[28px] md:p-[72px] lg:p-[0px] lg:flex lg:justify-center">
      <div className="lg:w-[592px] lg:py-[72px] space-y-[32px]">
        {CONTENT.map((value, index) => {
          return (
            <div key={index}>
              <div className="font-extrabold text-[24px] text-[#222] mb-[8px]">
                {t[value.title]}
              </div>

              <ReactMarkdown className="font-normal text-[#666] leading-8">
                {t[value.description]}
              </ReactMarkdown>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CONTENT = [
  {
    title: "PRIVACY.TITLE_1",
    description: "PRIVACY.DESCRIPTION_1",
  },
  {
    title: "PRIVACY.TITLE_2",
    description: "PRIVACY.DESCRIPTION_2",
  },
  {
    title: "PRIVACY.TITLE_3",
    description: "PRIVACY.DESCRIPTION_3",
  },
  {
    title: "PRIVACY.TITLE_4",
    description: "PRIVACY.DESCRIPTION_4",
  },
  {
    title: "PRIVACY.TITLE_5",
    description: "PRIVACY.DESCRIPTION_5",
  },
  {
    title: "PRIVACY.TITLE_6",
    description: "PRIVACY.DESCRIPTION_6",
  },
  {
    title: "PRIVACY.TITLE_7",
    description: "PRIVACY.DESCRIPTION_7",
  },
  {
    title: "PRIVACY.TITLE_8",
    description: "PRIVACY.DESCRIPTION_8",
  },
];

export default Privacy;
