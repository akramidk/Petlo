import { PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext } from "../../../src/hooks";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTime } from "luxon";
import BaseSelector from "../../../src/components/bases/BaseSelector";
import { View, Text } from "react-native";
import BaseLabel from "../../../src/components/bases/BaseLabel";
import { useRouter } from "expo-router";
import Popover from "react-native-popover-view";
import { useState } from "react";

const SelectDate = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  return (
    <PageStructure
      title={t("CREATE_AN_AUTOSHIP__STEPS.WHEN.PRIMARY_TEXT")}
      button={{
        value: t("COMMON__SAVE"),
        onClick: () => {
          router.back();
        },
        status: "inactive",
      }}
      link={{ value: t("COMMON__CANCEL"), onClick: router.back }}
    >
      <SelectNextShipment />
    </PageStructure>
  );
};

const SelectNextShipment = () => {
  const [isVisible, setIsVisible] = useState(false);

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
                  value=""
                  onClick={() => setIsVisible(true)}
                />
              </View>
            }
            popoverStyle={{ padding: 12 }}
          >
            <DateTimePicker
              value={DateTime.now().toJSDate()}
              display="inline"
              themeVariant="light"
            />
          </Popover>
        </View>
      </View>
    </>
  );
};

export default SelectDate;
