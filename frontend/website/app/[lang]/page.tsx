import { AutoshipFeatures } from "../components/AutoshipFeatures";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
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
      <div className="h-[52px] bg-[#ddd]">eloi</div>
      <div className="h-[52px] bg-[#fff]">qa</div>
    </div>
  );
};

export default Home;
