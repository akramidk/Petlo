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
        {data.map((item, index) => {
          return (
            <div
              className="py-[32px] px-[32px] md:p-[36px] lg:p-[52px] space-y-[16px] lg:space-y-[32px]"
              style={{ backgroundColor: item.bgColor }}
              key={index}
            >
              <div
                className="w-[100%] h-[200px] lg:h-[400px] rounded-[4px]"
                style={{ backgroundColor: item.imgBgColor }}
              ></div>

              <div className="space-y-[8px]">
                <div
                  className="font-bold text-[20px]"
                  style={{ color: item.titleColor }}
                >
                  {item.title}
                </div>

                <div
                  className="font-medium text-[14px] leading-[24px]"
                  style={{ color: item.descriptionColor }}
                >
                  {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

const data = [
  {
    title: "The new way bla bla bla bla with Autoship.",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    link: "Learn More About Autoship",
    bgColor: "#fff",
    titleColor: "#222",
    descriptionColor: "#666",
    imgBgColor: "#f8f8f8",
  },
  {
    title: "Want somthing without wating?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    bgColor: "#000",
    titleColor: "#fff",
    descriptionColor: "#888",
    imgBgColor: "#0c0c0c",
  },
];
