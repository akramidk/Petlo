import { useRouter, useSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { PageStructure } from "../../src/components/organisms";
import { PAYMENT_METHODS } from "../../src/constants";
import {
  useAPIFetching,
  useAPIMutation,
  useDataContext,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../src/hooks";
import {
  BaseOption,
  CustomerCardsRequest,
  CustomerCardsResponse,
  Payment as IPayment,
} from "../../src/interfaces";
import { Link, OptionsWithLabel } from "../../src/components/atoms";
import { View } from "react-native";
import { Endpoints } from "../../src/enums";
import { cardToDataCard } from "../../src/utils";
import { DataCard } from "../../src/components/molecules";
import { Loading } from "../../src/components/pages";
import {
  ChangeAutoshipPaymentRequest,
  ChangeAutoshipPaymentResponse,
} from "../../src/interfaces/Endpoints/ChangeAutoshipPayment";

const Payment = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { data, setData } = useDataContext();
  const { direction } = useInternationalizationContext();
  const { type, publicId } = useSearchParams();

  const isChange = type === "change";

  const [paymentMethod, setPaymentMethod] = useState<BaseOption>();
  const [card, setCard] = useState<BaseOption>();

  const { response: cardsResponse } = useAPIFetching<
    CustomerCardsRequest,
    CustomerCardsResponse
  >({
    endpoint: Endpoints.CUSTOMER_CARDS,
    options: {
      withPagination: true,
    },
  });

  const cards = useMemo(() => {
    return cardsResponse.body?.data?.map((card) => {
      return {
        id: card.public_id,
        value: (
          <DataCard
            {...cardToDataCard({
              card: card,
              direction: direction,
              t: t,
            })}
            withoutContainerStyles
          />
        ) as React.ReactNode,
      };
    });
  }, [cardsResponse]);

  const { trigger, status } = useAPIMutation<
    ChangeAutoshipPaymentRequest,
    ChangeAutoshipPaymentResponse
  >({
    endpoint: Endpoints.CHANGE_AUTOSHIP_PAYMENT_INFORMATION,
    method: "PATCH",
    options: {
      onSucceeded: () => {
        setData(undefined);
        router.back();
      },
      fireOnSucceededAfter: 1000,
    },
    slugs: {
      publicId: publicId,
    },
  });

  useEffect(() => {
    if (data?.payment === undefined || cards === undefined) return;

    setPaymentMethod(
      PAYMENT_METHODS.find(
        (paymentMethod) => data.payment.method === paymentMethod.id
      )
    );

    if (data.payment.method === "card") {
      setCard(cards.find((card) => card.id === data.payment.card.public_id));
    }
  }, [cards, data]);

  if (cardsResponse === undefined || cardsResponse.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={
        isChange
          ? t("CHANGE_AUTOSHIP_PAYMENT__TITLE")
          : t("CREATE_AN_AUTOSHIP__STEPS.HOW.PRIMARY_TEXT")
      }
      button={{
        value: isChange ? t("COMMON__CHANGE") : t("COMMON__SELECT"),
        onClick: () => {
          let payment: IPayment = {
            method: paymentMethod.id as IPayment["method"],
          };

          if (payment.method === "card") {
            payment = {
              ...payment,
              card: cardsResponse.body.data.find(
                (_card) => _card.public_id === card.id
              ),
            };
          }

          if (isChange) {
            const triggerPayment = {
              method: payment.method,
            };

            if (payment.method === "card") {
              triggerPayment["card"] = {
                id: payment.card.public_id,
              };
            }

            trigger({ payment: triggerPayment });

            return;
          }

          setData({
            ...data,
            payment,
          });

          router.back();
        },
        status:
          status ??
          (paymentMethod === undefined ||
          (paymentMethod.id === "card" && card === undefined) ||
          (paymentMethod.id === "cash" &&
            paymentMethod.id === data?.payment?.method) ||
          (paymentMethod.id === "card" &&
            paymentMethod.id === data?.payment?.method &&
            card.id === data?.payment?.card?.public_id)
            ? "inactive"
            : "active"),
      }}
      link={{
        value: t("COMMON__CANCEL"),
        onClick: () => {
          if (isChange) {
            setData(undefined);
          }

          router.back();
        },
        status: status ? "inactive" : "active",
      }}
    >
      <OptionsWithLabel
        cn="mb-[24px]"
        options={{
          optionValueCn: "text-[#666]",
          optionValueFont: "semiBold",
          options: PAYMENT_METHODS,
          signalSelect: {
            selectedOption: paymentMethod,
            setSelectedOption: setPaymentMethod,
          },
          translate: true,
        }}
      />

      {paymentMethod?.id === "card" && (
        <View className="mb-[40px]">
          <OptionsWithLabel
            cn="mb-[12px]"
            label={{
              name: t("CHECKOUT__SELECT_A_CARD"),
              bottomHelperText: t("AUTOSHIPS__CARD_PAYMENT_WARNINGS"),
              require: true,
            }}
            options={{
              optionValueCn: "text-[#666]",
              optionValueFont: "semiBold",
              options: cards,
              signalSelect: {
                selectedOption: card,
                setSelectedOption: setCard,
              },
            }}
          />

          <Link
            valueCN="text-[#9747FF] text-[14px]"
            value={t("CREATE_AN_AUTOSHIP__ADD_NEW_CARD_TO_USE")}
            onClick={() => router.push("/account/cards/add-new-card")}
          />
        </View>
      )}
    </PageStructure>
  );
};

export default Payment;
