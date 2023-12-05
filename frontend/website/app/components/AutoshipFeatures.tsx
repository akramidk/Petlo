import { BanknotesIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/outline";

export const AutoshipFeatures = ({
  t,
  lang,
}: {
  t: any;
  lang: "en" | "ar";
}) => {
  return (
    <div className="bg-[#f9f9f9] p-[20px] space-y-[20px]">
      {AUTOSHIP_FEATURES.map((feature, index) => {
        const { title, description, Icon } = feature;

        return (
          <div className="space-y-[12px]" key={index}>
            <div className="h-[56px] w-[56px] bg-[#f9f2f2] rounded-[4px] flex items-center justify-center">
              <Icon width={24} height={24} color="#222" strokeWidth={2} />
            </div>

            <div className="space-y-[4px]">
              <div className="text-[#222] text-[18px] font-extrabold">
                {t[title]}
              </div>
              <div className="text-[#777] text-[14px] font-medium leading-[24px]">
                {t[description]}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const AUTOSHIP_FEATURES = [
  {
    title: "AUTOSHIP_FEATURES_1_TITLE",
    description: "AUTOSHIP_FEATURES_1_DESCRIPTION",
    Icon: BanknotesIcon,
  },
  {
    title: "AUTOSHIP_FEATURES_2_TITLE",
    description: "AUTOSHIP_FEATURES_2_DESCRIPTION",
    Icon: ShoppingBagIcon,
  },
  {
    title: "AUTOSHIP_FEATURES_3_TITLE",
    description: "AUTOSHIP_FEATURES_3_DESCRIPTION",
    Icon: CalendarDaysIcon,
  },
  {
    title: "AUTOSHIP_FEATURES_4_TITLE",
    description: "AUTOSHIP_FEATURES_4_DESCRIPTION",
    Icon: XCircleIcon,
  },
];
