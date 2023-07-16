import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Filed, Selector } from "../../../src/components/atoms";
import BaseLabel from "../../../src/components/bases/BaseLabel";
import { AUTOSHIP_RECURRING_INTERVAL_OPTIONS } from "../../../src/constants";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import { BaseOption, RecurringInterval } from "../../../src/interfaces";

interface SelectThePeriodProps {
  recurringInterval: RecurringInterval;
  setRecurringInterval: Dispatch<SetStateAction<BaseOption>>;
  recurringIntervalCount: string;
  setRecurringIntervalCount: Dispatch<SetStateAction<string>>;
  isChange: boolean;
}

const SelectThePeriod = ({
  recurringInterval,
  setRecurringInterval,
  recurringIntervalCount,
  setRecurringIntervalCount,
  isChange,
}: SelectThePeriodProps) => {
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();

  return (
    <>
      <View className="space-y-[8px]">
        <BaseLabel
          name={
            isChange
              ? t("CHANGE_SHIPMENTS_DATES__THEN_EVERY")
              : t("CREATE_AN_AUTOSHIP__RECURRING_AFTER_FILED_LABEL")
          }
          require
        />

        <View
          className={clsx(
            "flex justify-between space-x-[8px]",
            direction === "ltr" ? "flex-row" : "flex-row-reverse"
          )}
        >
          <Filed
            cn="w-[63%]"
            onChange={setRecurringIntervalCount}
            value={recurringIntervalCount}
            keyboardType="number-pad"
            placeholder={
              recurringInterval.id === "day"
                ? t("CREATE_AN_AUTOSHIP__RECURRING_AFTER_DAY_FILED_PLACEHOLDER")
                : t(
                    "CREATE_AN_AUTOSHIP__RECURRING_AFTER_MONTH_FILED_PLACEHOLDER"
                  )
            }
          />
          <Selector<RecurringInterval>
            cn="w-[36%]"
            name=""
            signalSelect={{
              selectedOption: recurringInterval,
              setSelectedOption: setRecurringInterval,
            }}
            options={AUTOSHIP_RECURRING_INTERVAL_OPTIONS}
            showDropdownIcon
            translate
          />
        </View>
      </View>
    </>
  );
};

export default SelectThePeriod;
