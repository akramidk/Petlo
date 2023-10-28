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
      <Hero lang={lang} t={t} />

      <div className="lg:grid lg:grid-cols-2">
        <div className="bg-[#888]">dddddddddd</div>
        <div className="bg-[#000]">cccccccccccc</div>
      </div>
    </div>
  );
};

export default Home;
