import { getTranslation } from "@/app/utils/getTranslation";
import { useCallback } from "react";
import Link from "next/link";

const OrderInstantly = async ({
  params: { lang },
}: {
  params: { lang: "en" | "ar" };
}) => {
  const t = (await getTranslation(lang)) as any;

  return (
    <div className="bg-[#fff] p-[28px] md:p-[72px] lg:p-[0px] lg:flex lg:justify-center h-[100%]">
      <div className="lg:w-[592px] lg:py-[72px] space-y-[12px]">
        <div className="font-extrabold text-[24px] text-[#222] mb-[8px]">
          {t["ORDER_INSTANTLY.TITLE"]}
        </div>

        <div className="font-normal text-[#444] leading-8">
          {t["ORDER_INSTANTLY.DESCRIPTION"]}
        </div>

        <ul className="list-disc space-y-[12px] mx-[32px]">
          {WAYS.map((way, index) => {
            return (
              <li key={index}>
                <Link
                  className="block font-normal text-[#666] leading-8"
                  href={way.link}
                  target="_blank"
                >
                  {t[way.title]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const WAYS = [
  {
    title: "ORDER_INSTANTLY.WAY_1",
    link: "https://www.instagram.com/petlohq",
  },
  {
    title: "ORDER_INSTANTLY.WAY_2",
    link: "https://www.facebook.com/petloHQ",
  },
  {
    title: "ORDER_INSTANTLY.WAY_3",
    link: "https://wa.me/message/5GNHRB37TEZ3K1",
  },
  {
    title: "ORDER_INSTANTLY.WAY_4",
    link: "tel:+962790174799",
  },
];

export default OrderInstantly;
