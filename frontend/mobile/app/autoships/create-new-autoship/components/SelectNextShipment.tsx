import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTime } from "luxon";
import BaseSelector from "../../../../src/components/bases/BaseSelector";
import { View } from "react-native";
import BaseLabel from "../../../../src/components/bases/BaseLabel";
import Popover from "react-native-popover-view";
import { Dispatch, SetStateAction, useState } from "react";
import NextShipment from "../interfaces/NextShipment";

interface SelectNextShipment {
  value: NextShipment;
  setValue: Dispatch<SetStateAction<NextShipment>>;
}

const SelectNextShipment = ({
  value: selectedValue,
  setValue,
}: SelectNextShipment) => {
  const [isVisible, setIsVisible] = useState(false);

  const luxonDate = DateTime.now();
  const JSDate = luxonDate.toJSDate();
  const value = selectedValue
    ? DateTime.fromObject(selectedValue).toJSDate()
    : JSDate;
  const minimumDate = JSDate;
  const maximumDate = luxonDate.plus({ month: 3 }).toJSDate();

  return (
    <>
      <View className="space-y-[8px]">
        <BaseLabel name="First Shipment Date" require />

        <View>
          <Popover
            isVisible={isVisible}
            onRequestClose={() => setIsVisible(false)}
            from={
              <View>
                <BaseSelector
                  placeholder="Select first shipment date"
                  value={
                    selectedValue
                      ? `${selectedValue.day}/${selectedValue.month}/${selectedValue.year}`
                      : undefined
                  }
                  onClick={() => setIsVisible(true)}
                />
              </View>
            }
            popoverStyle={{ padding: 12 }}
          >
            <DateTimePicker
              value={value}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              display="inline"
              themeVariant="light"
              onChange={(e) => {
                if (e.type === "set") {
                  const date = DateTime.fromJSDate(
                    new Date(e.nativeEvent.timestamp)
                  );

                  setValue({
                    day: date.day,
                    month: date.month,
                    year: date.year,
                  });

                  setIsVisible(false);
                }
              }}
            />
          </Popover>
        </View>
      </View>
    </>
  );
};

export default SelectNextShipment;
