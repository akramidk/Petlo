import { AutoshipFeatures } from "../components/AutoshipFeatures";
import { Hero } from "../components/Hero";
import { getTranslation } from "../utils/getTranslation";

const Home = async ({
  params: { lang },
}: {
  params: { lang: "en" | "ar" };
}) => {
  const t = await getTranslation(lang);

  return (
    <div>
      <Hero t={t} lang={lang} />
      <AutoshipFeatures t={t} lang={lang} />
      <div className="h-[52px] bg-[#fff]"></div>
    </div>
  );
};

export default Home;
