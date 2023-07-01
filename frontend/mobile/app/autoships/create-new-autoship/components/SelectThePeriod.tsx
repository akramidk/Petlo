import { useState } from "react";
import { View } from "react-native";
import {
  Filed,
  FiledWithSelector,
  Selector,
} from "../../../../src/components/atoms";
import BaseLabel from "../../../../src/components/bases/BaseLabel";
import { BaseOption } from "../../../../src/interfaces";

const SelectThePeriod = () => {
  const [countryCode, setCountryCode] = useState<BaseOption>();

  return (
    <>
      <View className="space-y-[8px]">
        <BaseLabel name="Shipping then, after?" />

        <View className="flex flex-row justify-between space-x-[8px]">
          <Filed cn="w-[70%]" onChange={() => {}} value="" />
          <Selector
            cn="w-[29%]"
            name=""
            signalSelect={{
              selectedOption: countryCode,
              setSelectedOption: setCountryCode,
            }}
            options={[]}
            showDropdownIcon
          />
        </View>
      </View>
    </>
  );
};

export default SelectThePeriod;
