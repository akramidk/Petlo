import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTime } from "luxon";
import BaseSelector from "../../../src/components/bases/BaseSelector";
import { View } from "react-native";
import BaseLabel from "../../../src/components/bases/BaseLabel";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NextShipment from "../interfaces/NextShipment";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import Modal from "react-native-modal";
import * as Device from "expo-device";
import clsx from "clsx";

interface SelectNextShipment {
  value: NextShipment;
  setValue: Dispatch<SetStateAction<NextShipment>>;
  isChange: boolean;
}

const SelectNextShipment = ({
  value: selectedValue,
  setValue,
  isChange,
}: SelectNextShipment) => {
  const { t } = useTranslationsContext();
  const { languageWithoutGender } = useInternationalizationContext();

  const luxonDate = DateTime.now();
  const value = selectedValue
    ? DateTime.fromObject(selectedValue).toJSDate()
    : luxonDate.plus({ day: 1 }).toJSDate();
  const minimumDate = luxonDate.plus({ day: 1 }).toJSDate();
  const maximumDate = luxonDate.plus({ month: 3 }).toJSDate();

  const [isVisible, setIsVisible] = useState(false);

  const isIOS = Device.brand.toLowerCase() === "apple";

  useEffect(() => {
    if (selectedValue) return;

    const date = luxonDate.plus({ day: 1 });
    setValue({
      day: date.day,
      month: date.month,
      year: date.year,
    });
  }, []);

  return (
    <>
      <View className="space-y-[8px]">
        <BaseLabel
          name={
            isChange
              ? t("CHANGE_SHIPMENTS_DATES__NEXT_SHIPMENT_ON")
              : t("CREATE_AN_AUTOSHIP__SHIPMENT_DATE_FILED_LABEL")
          }
          require
        />

        <View>
          <BaseSelector
            placeholder={t(
              "CREATE_AN_AUTOSHIP__SHIPMENT_DATE_FILED_PLACEHOLDER"
            )}
            value={
              selectedValue
                ? `${selectedValue.day}/${selectedValue.month}/${selectedValue.year}`
                : undefined
            }
            onClick={() => setIsVisible(true)}
          />
        </View>

        <Modal
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
        >
          <View
            className={clsx({ ["bg-[#ffffff] p-[12px] rounded-[4px]"]: isIOS })}
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
              locale={languageWithoutGender}
            />
          </View>
        </Modal>
      </View>
    </>
  );
};

export default SelectNextShipment;
