import { Hero } from "../components/Hero";
import { Sections } from "../components/Sections";
import { getTranslation } from "../utils/getTranslation";

const Home = async ({
  params: { lang },
}: {
  params: { lang: "en" | "ar" };
}) => {
  const t = await getTranslation(lang);

  return (
    <div>
      <Hero lang={lang} t={t} heroTextKey="HOME.HERO_TEXT" img="screenshot" />
      <Sections data={sections} lang={lang} t={t} />
    </div>
  );
};

export default Home;

const sections = [
  {
    title: "HOME.SECTION_1_TITLE",
    description: "HOME.SECTION_1_DESCRIPTION",
    link: "autoship",
    linkText: "HOME.SECTION_1_LINK",
    bgColor: "#fff",
    titleColor: "#222",
    descriptionColor: "#666",
    imgBgColor: "#f8f8f8",
    img: "autoship",
  },
  {
    title: "HOME.SECTION_2_TITLE",
    description: "HOME.SECTION_2_DESCRIPTION",
    bgColor: "#000",
    titleColor: "#fff",
    descriptionColor: "#888",
    imgBgColor: "#0c0c0c",
    img: "item",
  },
];
