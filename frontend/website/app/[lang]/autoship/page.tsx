import { Hero } from "@/app/components/Hero";
import { Sections } from "@/app/components/Sections";
import { Accordion } from "@/app/components/Accordion";
import { getTranslation } from "@/app/utils/getTranslation";

const Autoship = async ({
  params: { lang },
}: {
  params: { lang: "en" | "ar" };
}) => {
  const t = await getTranslation(lang);

  return (
    <div>
      <Hero lang={lang} t={t} heroTextKey="HOME.HERO_TEXT" />
      <Sections data={sections} filpOrder lang={lang} t={t} />

      <div className="bg-[#f9f9f9] items-center justify-center text-center px-[20px] py-[32px] md:p-[32px] lg:p-[52px] text-[#222]">
        <div className="font-bold text-[20px] mb-[32px]">
          {t["AUTOSHIP.COMMON_QUESTIONS_TITLE"]}
        </div>

        <Accordion
          items={
            t["AUTOSHIP.COMMON_QUESTIONS"] as {
              question: string;
              answer: string;
            }[]
          }
          lang={lang}
        />
      </div>
    </div>
  );
};

export default Autoship;

const sections = [
  {
    title: "HOME.SECTION_1_TITLE",
    description: "HOME.SECTION_1_DESCRIPTION",
    bgColor: "#fff",
    titleColor: "#222",
    descriptionColor: "#666",
    imgBgColor: "#f8f8f8",
  },
  {
    title: "HOME.SECTION_1_TITLE",
    description: "HOME.SECTION_1_DESCRIPTION",
    bgColor: "#000",
    titleColor: "#fff",
    descriptionColor: "#888",
    imgBgColor: "#0c0c0c",
  },
  {
    title: "HOME.SECTION_1_TITLE",
    description: "HOME.SECTION_1_DESCRIPTION",
    bgColor: "#fff",
    titleColor: "#222",
    descriptionColor: "#666",
    imgBgColor: "#f8f8f8",
  },
  {
    title: "HOME.SECTION_1_TITLE",
    description: "HOME.SECTION_1_DESCRIPTION",
    bgColor: "#000",
    titleColor: "#fff",
    descriptionColor: "#888",
    imgBgColor: "#0c0c0c",
  },
];
