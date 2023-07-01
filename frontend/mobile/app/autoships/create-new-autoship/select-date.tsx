import { PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext } from "../../../src/hooks";
import { useRouter } from "expo-router";
import { useState } from "react";
import SelectNextShipment from "./components/SelectNextShipment";
import NextShipment from "./interfaces/NextShipment";
import SelectThePeriod from "./components/SelectThePeriod";
import { View } from "react-native";
import { AUTOSHIP_RECURRING_INTERVAL_OPTIONS } from "../../../src/constants";
import { BaseOption } from "../../../src/interfaces";

const SelectDate = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [nextShipment, setNextShipment] = useState<NextShipment>();
  const [recurringIntervalCount, setRecurringIntervalCount] =
    useState<string>("");
  const [recurringInterval, setRecurringInterval] = useState<BaseOption>(
    AUTOSHIP_RECURRING_INTERVAL_OPTIONS[0]
  );

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
      <SelectNextShipment value={nextShipment} setValue={setNextShipment} />
      <View className="mb-[16px]" />
      <SelectThePeriod
        recurringIntervalCount={recurringIntervalCount}
        setRecurringIntervalCount={setRecurringIntervalCount}
        recurringInterval={recurringInterval}
        setRecurringInterval={setRecurringInterval}
      />
    </PageStructure>
  );
};

export default SelectDate;
