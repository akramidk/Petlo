import { getTranslation } from "../utils/getTranslation";

const Home = async ({
  params: { lang },
}: {
  params: { lang: "en" | "ar" };
}) => {
  const t = await getTranslation(lang);

  return (
    <div>
      <div className="h-[52px] w-[100%]"></div>
    </div>
  );
};

export default Home;
