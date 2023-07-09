import { PageStructure } from "../../src/components/organisms";
import {
  useDataContext,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../src/hooks";
import { useRouter } from "expo-router";
import { useState } from "react";
import SelectNextShipment from "./components/SelectNextShipment";
import NextShipment from "./interfaces/NextShipment";
import SelectThePeriod from "./components/SelectThePeriod";
import { View } from "react-native";
import { AUTOSHIP_RECURRING_INTERVAL_OPTIONS } from "../../src/constants";
import { BaseOption, RecurringInterval } from "../../src/interfaces";
import { Text } from "../../src/components/atoms";
import clsx from "clsx";

const Date = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { data, setData } = useDataContext();
  const { direction } = useInternationalizationContext();

  const [nextShipment, setNextShipment] = useState<NextShipment>(
    data?.nextShipment
  );
  const [recurringInterval, setRecurringInterval] = useState<RecurringInterval>(
    data?.recurringInterval
      ? AUTOSHIP_RECURRING_INTERVAL_OPTIONS.find(
          (recurringInterval) =>
            recurringInterval.id === data.recurringInterval.id
        )
      : AUTOSHIP_RECURRING_INTERVAL_OPTIONS[0]
  );
  const [recurringIntervalCount, setRecurringIntervalCount] = useState<string>(
    data?.recurringIntervalCount ?? ""
  );

  const recurringIntervalCountAsNumber = Number(recurringIntervalCount);

  const isRecurringIntervalCountValid =
    (recurringInterval.id === "day" &&
      recurringIntervalCountAsNumber >= 5 &&
      recurringIntervalCountAsNumber <= 90) ||
    (recurringInterval.id === "month" &&
      recurringIntervalCountAsNumber >= 1 &&
      recurringIntervalCountAsNumber <= 3);

  const isChanged =
    data?.recurringInterval !== recurringInterval ||
    data?.recurringIntervalCount !== recurringIntervalCount ||
    data?.nextShipment?.day !== nextShipment?.day ||
    data?.nextShipment?.month !== nextShipment?.month ||
    data?.nextShipment?.year !== nextShipment.year;

  return (
    <PageStructure
      title={t("CREATE_AN_AUTOSHIP__STEPS.WHEN.PRIMARY_TEXT")}
      button={{
        value: t("COMMON__SAVE"),
        onClick: () => {
          setData({
            ...data,
            nextShipment: nextShipment,
            recurringInterval: recurringInterval,
            recurringIntervalCount: recurringIntervalCount,
          });

          router.back();
        },
        status:
          nextShipment && isRecurringIntervalCountValid && isChanged
            ? "active"
            : "inactive",
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

      <View className="space-y-[12px] mt-[32px]">
        <View
          className={clsx(
            "justify-between",
            direction === "ltr" ? "flex-row" : "flex-row-reverse"
          )}
        >
          <Text font="semiBold" cn="text-[14px] text-[#666]">
            {t("CREATE_AN_AUTOSHIP__FIRST_SHIPMENT_ON")}
          </Text>
          <Text font="semiBold" cn="text-[14px] text-[#666]">
            {nextShipment
              ? `${nextShipment.day}/${nextShipment.month}/${nextShipment.year}`
              : t("COMMON__NOT_SELECTED")}
          </Text>
        </View>

        <View
          className={clsx(
            "justify-between",
            direction === "ltr" ? "flex-row" : "flex-row-reverse"
          )}
        >
          <Text font="semiBold" cn="text-[14px] text-[#666]">
            {t("CREATE_AN_AUTOSHIP__THEN_EVERY")}
          </Text>
          <Text font="semiBold" cn="text-[14px] text-[#666]">
            {recurringIntervalCountAsNumber
              ? isRecurringIntervalCountValid
                ? `${recurringIntervalCountAsNumber} ${t(
                    recurringInterval.value
                  )}`
                : recurringInterval.id === "day"
                ? t("CREATE_AN_AUTOSHIP__RECURRING_INTERVAL_INVALID_DAYS")
                : t("CREATE_AN_AUTOSHIP__RECURRING_INTERVAL_INVALID_MONTHS")
              : t("COMMON__NOT_ADDED")}
          </Text>
        </View>
      </View>
    </PageStructure>
  );
};

export default Date;
