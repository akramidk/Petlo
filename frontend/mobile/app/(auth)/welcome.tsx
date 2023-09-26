import clsx from "clsx";
import { useRouter } from "expo-router";
import { View, Image } from "react-native";
import { Button, Logo, Text } from "../../src/components/atoms";
import { BaseButton } from "../../src/components/bases";
import {
  useCustomerContext,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../src/hooks";

const Welcome = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { setSkipCustomer } = useCustomerContext();
  const { direction } = useInternationalizationContext();

  return (
    <View
      style={{
        backgroundColor: "rgb(232, 228, 215)",
      }}
      className="grow py-[52px]"
    >
      <View className="items-center px-[36px]">
        <Image
          style={{
            height: 300,
            width: 300,
          }}
          source={require("../../src/assets/images/bowl.webp")}
        />

        <Text font="light" cn="text-[48px] text-[#0E333C] leading-[80px]">
          {t("WELCOME__TITLE")}
        </Text>

        <Logo cn="text-[52px] text-[#0E333C]" />
      </View>

      <View
        className={
          "absolute bottom-0 mb-[52px] px-[36px] w-[100%] items-center"
        }
      >
        <View
          className={clsx(
            "space-x-[6px]",
            direction === "ltr" ? "flex-row" : "flex-row-reverse"
          )}
        >
          <BaseButton
            onClick={() => {
              router.push("/sign-up");
            }}
            cn="grow h-[52px] bg-[#0E333C] rounded-[4px] items-center justify-center"
          >
            <Text font="semiBold" cn="text-[#eee] text-[14px]">
              {t("WELCOME__SIGN_UP_BUTTON")}
            </Text>
          </BaseButton>

          <BaseButton
            onClick={() => {
              router.push("/sign-in");
            }}
            cn="grow h-[52px] border-[1px] border-[#0E333C] rounded-[4px] items-center justify-center"
          >
            <Text font="semiBold" cn="text-[#0E333C] text-[14px]">
              {t("WELCOME__SIGN_IN_BUTTON")}
            </Text>
          </BaseButton>
        </View>

        <BaseButton
          onClick={() => {
            setSkipCustomer(true);
          }}
          cn="p-[20px]"
        >
          <Text font="bold" cn="text-[15px] text-[#666]">
            {t("WELCOME__CONTINUE_WITHOUT_ACCOUNT")}
          </Text>
        </BaseButton>
      </View>
    </View>
  );
};

export default Welcome;
