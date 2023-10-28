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

      <div></div>
    </div>
  );
};

export default Home;
