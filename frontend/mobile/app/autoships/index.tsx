import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Text } from "../../src/components/atoms";
import { BaseButton } from "../../src/components/bases";
import { DataCards, PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import {
  useAPIFetching,
  useDataContext,
  useTranslationsContext,
} from "../../src/hooks";
import { DataCardProps } from "../../src/interfaces";
import { AutoshipsResponse } from "../../src/interfaces/Endpoints/Autoships";
import { Loading } from "../../src/components/pages";
import NextShipment from "./interfaces/NextShipment";

const Autoships = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { data, setData } = useDataContext();
  const { response } = useAPIFetching<void, AutoshipsResponse>({
    endpoint: Endpoints.AUTOSHIPS,
    options: {
      withPagination: true,
    },
  });

  const autoships: DataCardProps[] = useMemo(() => {
    if (response.isFetching) return [];

    return response.body.data.map((autoship) => {
      const actions = [];

      if (autoship.status === "active") {
        actions.push(
          {
            name: t("AUTOSHIPS__ACTIONS.CHANGE_NAME"),
            onClick: () =>
              router.push(
                `/autoships/change-name?publicId=${autoship.public_id}`
              ),
          },
          {
            name: t("AUTOSHIPS__ACTIONS.CHANGE_ADDRESS"),
            onClick: () => {
              setData({
                address: {
                  public_id: autoship.address_id,
                },
              });

              router.push(
                `/autoships/address?publicId=${autoship.public_id}&type=change`
              );
            },
          },
          {
            name: t("AUTOSHIPS__ACTIONS.CHANGE_ITEMS"),
            onClick: () => {
              setData({
                selectedItems: autoship.items.map((item) => {
                  return {
                    itemId: item.item_id,
                    variantId: item.variant_id,
                    quantity: item.quantity,
                  };
                }),
              });

              router.push(
                `/autoships/items?publicId=${autoship.public_id}&type=change`
              );
            },
          },
          {
            name: t("AUTOSHIPS__ACTIONS.CHANGE_PAYMENT_INFORMATION"),
            onClick: () => {
              const payment = {
                method: autoship.payment_method,
              };

              if (autoship.payment_method === "card") {
                payment["card"] = {
                  public_id: autoship.payment_card_id,
                };
              }

              setData({
                payment,
              });

              router.push(
                `/autoships/payment?publicId=${autoship.public_id}&type=change`
              );
            },
          },
          {
            name: t("AUTOSHIPS__ACTIONS.CHANGE_PETS"),
            onClick: () => {
              setData({
                pets: autoship.pets.map((pet) => {
                  return { public_id: pet };
                }),
              });

              router.push(
                `/autoships/pets?publicId=${autoship.public_id}&type=change`
              );
            },
          },
          {
            name: t("AUTOSHIPS__ACTIONS.CHANGE_SHIPMENTS_DATES"),
            onClick: () => {
              const nextShipmentAsArray = autoship.next_shipment_on.split("-");
              const nextShipment: NextShipment = {
                year: Number(nextShipmentAsArray[0]),
                month: Number(nextShipmentAsArray[1]),
                day: Number(nextShipmentAsArray[2]),
              };

              setData({
                recurringIntervalCount:
                  autoship.recurring_interval_count.toString(),
                recurringInterval: {
                  id: autoship.recurring_interval,
                },
                nextShipment: nextShipment,
              });

              router.push(
                `/autoships/date?publicId=${autoship.public_id}&type=change`
              );
            },
          },
          {
            name: t("AUTOSHIPS__ACTIONS.SKIP"),
            onClick: () =>
              router.push(`/autoships/skip?publicId=${autoship.public_id}`),
          },
          {
            name: t("AUTOSHIPS__ACTIONS.DEACTIVATE_AUTOSHIP"),
            onClick: () =>
              router.push(
                `/autoships/deactivate?publicId=${autoship.public_id}`
              ),
          }
        );
      } else {
        actions.push({
          name: t("AUTOSHIPS__ACTIONS.REACTIVATE"),
          onClick: () =>
            router.push(
              `/autoships/date?publicId=${autoship.public_id}&type=reactivate`
            ),
        });
      }

      return {
        primaryText: autoship.name,
        helperText:
          autoship.status !== "active"
            ? t(`AUTOSHIPS__${autoship.status.toUpperCase()}`)
            : undefined,
        secondaryText:
          autoship.status === "active"
            ? `${t("AUTOSHIPS__NEXT_SHIPMENT_ON")} ${autoship.next_shipment_on
                .split("-")
                .reverse()
                .join("-")}`
            : autoship.status === "inactive"
            ? t("AUTOSHIPS__PAYMENT_ERROR")
            : undefined,
        actions: actions,
      };
    });
  }, [response]);

  if (response === undefined || response.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={t("AUTOSHIPS__TITLE")}
      floatingElement={
        <BaseButton
          cn="bg-[#6BADAE] px-[32px] py-[20px] rounded-full shadow-lg"
          onClick={() => router.push("/autoships/create-new-autoship")}
        >
          <Text font="bold" cn="text-[#fff] text-[14px]">
            {t("AUTOSHIPS__CREATE_AN_AUTOSHIP")}
          </Text>
        </BaseButton>
      }
    >
      <DataCards data={autoships} />
    </PageStructure>
  );
};

export default Autoships;
