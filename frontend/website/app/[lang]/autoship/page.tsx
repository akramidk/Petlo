import { Hero } from "@/app/components/Hero";
import { getTranslation } from "@/app/utils/getTranslation";

const Autoship = async ({
  params: { lang },
}: {
  params: { lang: "en" | "ar" };
}) => {
  const t = await getTranslation(lang);

  return (
    <div>
      <Hero lang={lang} t={t} />
      <div>vbla</div>
    </div>
  );
};

export default Autoship;
