"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const Accordion = ({
  items,
}: {
  items: {
    question: string;
    answer: string;
  }[];
}) => {
  const [openedIndex, setOpenedIndex] = useState<number>();

  return (
    <div>
      {items.map((item, index) => {
        const opened = openedIndex === index;
        const Icon = openedIndex === index ? ChevronUpIcon : ChevronDownIcon;

        return (
          <div
            key={index}
            className="text-left py-[20px] border-b border-b-[#ddd]"
            onClick={() => setOpenedIndex(opened ? undefined : index)}
          >
            <div className="flex justify-between">
              <div className="w-[75%] text-[#444] font-semibold text-[14px]">
                {item.question}
              </div>
              <Icon width={18} height={18} strokeWidth={2.4} color="#444" />
            </div>

            {opened && (
              <div className="mt-[20px] text-[14px] text-[#666]">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
