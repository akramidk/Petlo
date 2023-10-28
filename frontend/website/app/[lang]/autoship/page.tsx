import { Hero } from "@/app/components/Hero";
import { Sections } from "@/app/components/Sections";
import { Accordion } from "@/app/components/Accordion";
import { getTranslation } from "@/app/utils/getTranslation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Autoship = async ({
  params: { lang },
}: {
  params: { lang: "en" | "ar" };
}) => {
  const t = await getTranslation(lang);

  return (
    <div>
      <Hero lang={lang} t={t} heroTextKey="HOME.HERO_TEXT" />
      <Sections data={sections} filpOrder />

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
        />
      </div>
    </div>
  );
};

export default Autoship;

const sections = [
  {
    title: "The new way bla bla bla bla with Autoship.",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    link: "Learn More About Autoship",
    bgColor: "#fff",
    titleColor: "#222",
    descriptionColor: "#666",
    imgBgColor: "#f8f8f8",
  },
  {
    title: "Want somthing without wating?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    bgColor: "#000",
    titleColor: "#fff",
    descriptionColor: "#888",
    imgBgColor: "#0c0c0c",
  },
  {
    title: "The new way bla bla bla bla with Autoship.",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    link: "Learn More About Autoship",
    bgColor: "#fff",
    titleColor: "#222",
    descriptionColor: "#666",
    imgBgColor: "#f8f8f8",
  },
  {
    title: "Want somthing without wating?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    bgColor: "#000",
    titleColor: "#fff",
    descriptionColor: "#888",
    imgBgColor: "#0c0c0c",
  },
];
