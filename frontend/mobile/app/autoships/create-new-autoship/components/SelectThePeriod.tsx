import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Filed, Selector } from "../../../../src/components/atoms";
import BaseLabel from "../../../../src/components/bases/BaseLabel";
import { AUTOSHIP_RECURRING_INTERVAL_OPTIONS } from "../../../../src/constants";
import { BaseOption } from "../../../../src/interfaces";

interface SelectThePeriodProps {
  recurringInterval: BaseOption;
  setRecurringInterval: Dispatch<SetStateAction<BaseOption>>;
  recurringIntervalCount: string;
  setRecurringIntervalCount: Dispatch<SetStateAction<string>>;
}

const SelectThePeriod = ({
  recurringInterval,
  setRecurringInterval,
  recurringIntervalCount,
  setRecurringIntervalCount,
}: SelectThePeriodProps) => {
  return (
    <>
      <View className="space-y-[8px]">
        <BaseLabel name="Recurring after the first shipment every?" require />

        <View className="flex flex-row justify-between space-x-[8px]">
          <Filed
            cn="w-[63%]"
            onChange={setRecurringIntervalCount}
            value={recurringIntervalCount}
            keyboardType="number-pad"
            placeholder={
              recurringInterval.id === "day"
                ? "from 5 to 90 days"
                : "from 1 to 3 months"
            }
          />
          <Selector
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
