import { AutoshipFeatures } from "../components/AutoshipFeatures";
import { Hero } from "../components/Hero";
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
      <div className="h-[52px] bg-[#ddd]">how autoship works</div>
      <div className="h-[52px] bg-[#fff]">what you can do more</div>
      <div className="h-[52px] bg-[#ddd]">eloi</div>
      <div className="h-[52px] bg-[#fff]">qa</div>
    </div>
  );
};

export default Home;
