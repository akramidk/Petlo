import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Sections {
  data: {
    title: string;
    description: string;
    link?: string;
    bgColor: string;
    titleColor: string;
    descriptionColor: string;
    imgBgColor?: string;
  }[];
  filpOrder?: boolean;
}

export const Sections = ({ data, filpOrder }: Sections) => {
  return (
    <div className="md:grid md:grid-cols-2">
      {data.map((item, index) => {
        console.log("index", index);

        const order = filpOrder
          ? index < 2
            ? index
            : index % 2
            ? index - 1
            : index + 1
          : "none";

        return (
          <div
            className="py-[32px] px-[32px] md:p-[36px] lg:p-[52px] space-y-[16px] lg:space-y-[32px]"
            style={{ backgroundColor: item.bgColor, order: order }}
            key={index}
          >
            <div
              className="w-[100%] h-[200px] lg:h-[400px] rounded-[4px]"
              style={{ backgroundColor: item.imgBgColor }}
            ></div>

            <div className="space-y-[8px]">
              <div
                className="font-bold text-[20px] lg:text-[22px]"
                style={{ color: item.titleColor }}
              >
                {item.title}
              </div>

              <div
                className="font-medium text-[14px] leading-[24px] lg:text-[16px] lg:leading-[30px]"
                style={{ color: item.descriptionColor }}
              >
                {item.description}
              </div>
            </div>

            {item?.link && (
              <Link
                href="/autoship"
                className="flex underline items-center space-x-[4px]"
              >
                <div className="font-bold text-[#444] text-[15px]">
                  {item?.link}
                </div>
                <ArrowUpRightIcon width={14} strokeWidth={3} color="#444" />
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};
