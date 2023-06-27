import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { PageStructure } from "../../../src/components/organisms";
import { PAYMENT_METHODS } from "../../../src/constants";
import {
  useAPIFetching,
  useDataContext,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import {
  BaseOption,
  CustomerCardsRequest,
  CustomerCardsResponse,
  Payment,
} from "../../../src/interfaces";
import { Link, OptionsWithLabel } from "../../../src/components/atoms";
import { View } from "react-native";
import { Endpoints } from "../../../src/enums";
import { cardToDataCard } from "../../../src/utils";
import { DataCard } from "../../../src/components/molecules";
import Loading from "../../_Loading";

const SelectPayment = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { data, setData } = useDataContext();
  const { direction } = useInternationalizationContext();

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

  useEffect(() => {
    console.log("data", data);

    const payment: Payment = data?.payment;
    if (payment === undefined) return;

    setPaymentMethod(
      PAYMENT_METHODS.find(
        (paymentMethod) => payment.method === paymentMethod.id
      )
    );

    if (payment.method === "card") {
      setCard(cards.find((card) => card.id === payment.card.id));
    }
  }, []);

  if (cardsResponse === undefined || cardsResponse.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={t("CREATE_AN_AUTOSHIP__STEPS.HOW.PRIMARY_TEXT")}
      button={{
        value: "Select",
        onClick: () => {
          let payment: Payment = {
            method: paymentMethod.id as Payment["method"],
          };

          if (payment.method === "card") {
            payment = {
              ...payment,
              card: {
                id: card.id as string,
              },
            };
          }

          console.log("payment", payment);

          setData({
            ...data,
            payment,
          });

          router.back();
        },
      }}
      link={{ value: "Cancel", onClick: router.back }}
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
            value="+ Add New Card To Use"
            onClick={() => router.push("/account/cards/add-new-card")}
          />
        </View>
      )}
    </PageStructure>
  );
};

export default SelectPayment;
