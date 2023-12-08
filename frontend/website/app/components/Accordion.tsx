"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useState } from "react";
import reactStringReplace from "react-string-replace";

export const Accordion = ({
  sections,
  lang,
}: {
  sections: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  }[];
  lang: "en" | "ar";
}) => {
  const [openedIndex, setOpenedIndex] = useState<string>();

  return (
    <div className="lg:inline-block lg:items-center space-y-[56px]">
      {sections.map((section, section_index) => {
        return (
          <div key={section_index}>
            <div className="text-[#444] text-[16px] font-bold mb-[4px]">
              {section.title}
            </div>

            {section.items.map((item, item_index) => {
              const index = `${section_index}-${item_index}`;
              const opened = openedIndex === index;
              const Icon = opened ? ChevronUpIcon : ChevronDownIcon;

              return (
                <div
                  key={item_index}
                  className={clsx(
                    "py-[20px] border-b border-b-[#ddd] lg:w-[800px]",
                    lang === "en" ? "text-left" : "text-right"
                  )}
                >
                  <div
                    className="flex justify-between select-none cursor-pointer"
                    onClick={() => setOpenedIndex(opened ? undefined : index)}
                  >
                    <div className="w-[75%] text-[#444] font-semibold text-[14px] lg:text-[15px]">
                      {item.question}
                    </div>
                    <Icon
                      width={18}
                      height={18}
                      strokeWidth={2.4}
                      color="#444"
                    />
                  </div>

                  {opened && (
                    <div className="mt-[20px] text-[14px] leading-[24px] lg:text-[15px] lg:leading-[28px] font-medium  text-[#666]">
                      {reactStringReplace(item.answer, "{{br}}", (_, i) => (
                        <Fragment key={item_index}>
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
      })}
    </div>
  );
};
