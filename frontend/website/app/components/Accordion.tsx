"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useState } from "react";
import reactStringReplace from "react-string-replace";

export const Accordion = ({
  items,
  lang,
}: {
  items: {
    question: string;
    answer: string;
  }[];
  lang: "en" | "ar";
}) => {
  const [openedIndex, setOpenedIndex] = useState<number>();

  return (
    <div className="inline-block items-center">
      {items.map((item, index) => {
        const opened = openedIndex === index;
        const Icon = openedIndex === index ? ChevronUpIcon : ChevronDownIcon;

        return (
          <div
            key={index}
            className={clsx(
              "py-[20px] border-b border-b-[#ddd] cursor-pointer lg:w-[800px]",
              lang === "en" ? "text-left" : "text-right"
            )}
            onClick={() => setOpenedIndex(opened ? undefined : index)}
          >
            <div className="flex justify-between">
              <div className="w-[75%] text-[#444] font-semibold text-[14px] lg:text-[15px]">
                {item.question}
              </div>
              <Icon width={18} height={18} strokeWidth={2.4} color="#444" />
            </div>

            {opened && (
              <div className="mt-[20px] text-[14px] leading-[24px] lg:text-[15px] lg:leading-[28px] font-medium  text-[#666]">
                {reactStringReplace(item.answer, "{{br}}", (_, i) => (
                  <Fragment key={index}>
                    <br />
                    <br />
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
