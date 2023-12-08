import { AutoshipFeatures } from "../components/AutoshipFeatures";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { Last } from "../components/Last";
import { MoreThings } from "../components/MoreThings";
import { Testimonials } from "../components/Testimonials";
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
      <Testimonials t={t} lang={lang} />
      <HowItWorks t={t} lang={lang} />
      <MoreThings t={t} lang={lang} />
      <Last t={t} lang={lang} />
    </div>
  );
};

export default Home;
