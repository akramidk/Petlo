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
      <div>
        <Hero />
        <div>{t["HOME.CHANGE_LANG"]}</div>
      </div>
    </div>
  );
};

export default Home;
