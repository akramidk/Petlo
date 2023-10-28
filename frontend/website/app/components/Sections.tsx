import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";
import reactStringReplace from "react-string-replace";

interface Sections {
  data: {
    title: string;
    description: string;
    link?: string;
    linkText?: string;
    bgColor: string;
    titleColor: string;
    descriptionColor: string;
    imgBgColor?: string;
  }[];
  filpOrder?: boolean;
  lang: "en" | "ar";
  t: { [key: string]: string };
}

export const Sections = ({ data, filpOrder, lang, t }: Sections) => {
  return (
    <div className="md:grid md:grid-cols-2">
      {data.map((item, index) => {
        const order = filpOrder
          ? index < 2
            ? index
            : index % 2
            ? index - 1
            : index + 1
          : "none";

        return (
          <div
            className="py-[32px] px-[20px] md:p-[36px] lg:p-[52px] space-y-[16px] lg:space-y-[32px]"
            style={{ backgroundColor: item.bgColor, order: order }}
            key={index}
          >
            <div
              className="w-[100%] h-[200px] lg:h-[400px] rounded-[4px]"
              style={{ backgroundColor: item.imgBgColor }}
            ></div>

            <div className="space-y-[16px]">
              <div
                className="font-bold text-[20px] lg:text-[22px]"
                style={{ color: item.titleColor }}
              >
                {t[item.title]}
              </div>

              <div
                className="font-medium text-[14px] leading-[24px] lg:text-[16px] lg:leading-[30px]"
                style={{ color: item.descriptionColor }}
              >
                {reactStringReplace(t[item.description], "{{br}}", (_, i) => (
                  <Fragment key={index}>
                    <br />
                    <br />
                  </Fragment>
                ))}
              </div>
            </div>

            {item?.link && (
              <Link
                href={`/${lang}/${item.link}`}
                className="flex underline items-center"
              >
                <div
                  className={clsx(
                    "font-bold text-[#444] text-[15px]",
                    lang === "en" ? "mr-[4px]" : "ml-[4px]"
                  )}
                >
                  {item?.linkText ? t[item?.linkText] : ""}
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
