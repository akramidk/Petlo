import { getTranslation } from "@/app/utils/getTranslation";

const Support = async ({
  params: { lang },
}: {
  params: { lang: "en" | "ar" };
}) => {
  const t = await getTranslation(lang);

  return (
    <div className="bg-[#fff] p-[28px] md:p-[72px] lg:p-[0px] lg:flex lg:justify-center h-[100%]">
      <div className="lg:w-[592px] lg:py-[72px] space-y-[12px]">
        <div className="font-extrabold text-[24px] text-[#222] mb-[8px]">
          {t["SUPPORT.TITLE"]}
        </div>

        <div className="font-normal text-[#666] leading-8">
          {t["SUPPORT.DESCRIPTION"]}
        </div>
      </div>
    </div>
  );
};

export default Support;
