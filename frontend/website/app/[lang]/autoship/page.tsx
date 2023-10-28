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
      <Hero lang={lang} t={t} heroTextKey="AUTOSHIP.HERO_TEXT" img="autoship" />
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
    title: "AUTOSHIP.SECTION_1_TITLE",
    description: "AUTOSHIP.SECTION_1_DESCRIPTION",
    bgColor: "#fff",
    titleColor: "#222",
    descriptionColor: "#666",
  },
  {
    title: "AUTOSHIP.SECTION_2_TITLE",
    description: "AUTOSHIP.SECTION_2_DESCRIPTION",
    bgColor: "#000",
    titleColor: "#fff",
    descriptionColor: "#888",
  },
  {
    title: "AUTOSHIP.SECTION_3_TITLE",
    description: "AUTOSHIP.SECTION_3_DESCRIPTION",
    bgColor: "#fff",
    titleColor: "#222",
    descriptionColor: "#666",
  },
  {
    title: "AUTOSHIP.SECTION_4_TITLE",
    description: "AUTOSHIP.SECTION_4_DESCRIPTION",
    bgColor: "#000",
    titleColor: "#fff",
    descriptionColor: "#888",
  },
];
