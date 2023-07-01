import { PageStructure } from "../../../src/components/organisms";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import { useRouter } from "expo-router";
import { useState } from "react";
import SelectNextShipment from "./components/SelectNextShipment";
import NextShipment from "./interfaces/NextShipment";
import SelectThePeriod from "./components/SelectThePeriod";
import { View } from "react-native";
import { AUTOSHIP_RECURRING_INTERVAL_OPTIONS } from "../../../src/constants";
import { BaseOption } from "../../../src/interfaces";
import { Text } from "../../../src/components/atoms";
import clsx from "clsx";

const SelectDate = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();

  const [nextShipment, setNextShipment] = useState<NextShipment>();
  const [recurringIntervalCount, setRecurringIntervalCount] =
    useState<string>("");
  const [recurringInterval, setRecurringInterval] = useState<BaseOption>(
    AUTOSHIP_RECURRING_INTERVAL_OPTIONS[0]
  );

  const recurringIntervalCountAsNumber = Number(recurringIntervalCount);

  const isValid =
    nextShipment &&
    ((recurringInterval.id === "day" &&
      recurringIntervalCountAsNumber >= 5 &&
      recurringIntervalCountAsNumber <= 90) ||
      (recurringInterval.id === "month" &&
        recurringIntervalCountAsNumber >= 1 &&
        recurringIntervalCountAsNumber <= 3));

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

      {isValid && (
        <View className="space-y-[12px] mt-[32px]">
          <View
            className={clsx(
              "justify-between",
              direction === "ltr" ? "flex-row" : "flex-row-reverse"
            )}
          >
            <Text font="semiBold" cn="text-[14px] text-[#666]">
              First shipment on
            </Text>
            <Text font="semiBold" cn="text-[14px] text-[#666]">
              {nextShipment
                ? `${nextShipment.day}/${nextShipment.month}/${nextShipment.year}`
                : "not selected"}
            </Text>
          </View>

          <View
            className={clsx(
              "justify-between",
              direction === "ltr" ? "flex-row" : "flex-row-reverse"
            )}
          >
            <Text font="semiBold" cn="text-[14px] text-[#666]">
              Then every
            </Text>
            <Text font="semiBold" cn="text-[14px] text-[#666]">
              {recurringIntervalCountAsNumber} {t(recurringInterval.value)}
            </Text>
          </View>
        </View>
      )}
    </PageStructure>
  );
};

export default SelectDate;
