import { useState } from "react";
import { View } from "react-native";
import {
  Filed,
  FiledWithSelector,
  Selector,
} from "../../../../src/components/atoms";
import BaseLabel from "../../../../src/components/bases/BaseLabel";
import { AUTOSHIP_RECURRING_INTERVAL_OPTIONS } from "../../../../src/constants";
import { BaseOption } from "../../../../src/interfaces";

const SelectThePeriod = () => {
  const [recurringIntervalCount, setRecurringIntervalCount] =
    useState<string>();
  const [recurringInterval, setRecurringInterval] = useState<BaseOption>(
    AUTOSHIP_RECURRING_INTERVAL_OPTIONS[0]
  );

  return (
    <>
      <View className="space-y-[8px]">
        <BaseLabel name="Shipping then, after?" />

        <View className="flex flex-row justify-between space-x-[8px]">
          <Filed
            cn="w-[63%]"
            onChange={setRecurringIntervalCount}
            value={recurringIntervalCount}
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
