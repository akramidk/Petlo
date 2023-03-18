import { useRouter } from "expo-router";
import { Form } from "../../src/components/organisms";
import {
  useAPIMutation,
  useSettingsContext,
  useTranslationsContext,
} from "../../src/hooks";
import { FiledWithSelector, Filed, Link } from "../../src/components/atoms";
import { useMemo, useState } from "react";
import { COUNTIES_PHONE_CODE_OPTIONS } from "../../src/constants";
import {
  BaseOption,
  CreateSessionRequest,
  CreateSessionResponse,
} from "../../src/interfaces";
import { Endpoints } from "../../src/enums";
import { View } from "react-native";
import clsx from "clsx";

const SignIn = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useSettingsContext();

  const [countryCode, setCountryCode] = useState<BaseOption>(
    COUNTIES_PHONE_CODE_OPTIONS.find((code) => code.value === "+962")
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const buttonStatus = useMemo(() => {
    return countryCode &&
      phoneNumber.trim().length > 0 &&
      password.trim().length > 0
      ? "active"
      : "inactive";
  }, [countryCode, phoneNumber, password]);

  const { response, trigger, status } = useAPIMutation<
    CreateSessionRequest,
    CreateSessionResponse
  >({
    endpoint: Endpoints.CREATE_SESSION,
    method: "POST",
    options: {
      onSucceeded: () => {
        const page = response.body.customer.verified
          ? "verify-sign-in"
          : "verify-your-account";

        router.replace(
          `/${page}?${new URLSearchParams({
            phoneNumber: countryCode.value + phoneNumber,
            sessionToken: response.body.customer.session_token,
          }).toString()}`
        );
      },
      fireOnSucceededAfter: 1000,
    },
  });

  return (
    <Form
      title={t("SIGN_IN__TITLE")}
      backButton={() => router.back()}
      button={{
        value: t("SIGN_UP__BUTTON"),
        onClick: () => {
          trigger({
            phone_number: countryCode.value + phoneNumber,
            password: password,
          });
        },
        status: status ?? buttonStatus,
      }}
    >
      <FiledWithSelector
        cn="mb-[16px]"
        name={t("SIGN_IN__PHONE_NUMBER_LABEL")}
        require={true}
        placeholder={t("SIGN_IN__PHONE_NUMBER_PLACEHOLDER")}
        options={COUNTIES_PHONE_CODE_OPTIONS}
        signalSelect={{
          selectedOption: countryCode,
          setSelectedOption: setCountryCode,
        }}
        value={phoneNumber}
        onChange={setPhoneNumber}
        keyboardType="number-pad"
      />

      <Filed
        name={t("SIGN_IN__PASSWORD_FILED_LABEL")}
        require={true}
        placeholder={t("SIGN_IN__PASSWORD_FILED_PLACEHOLDER")}
        onChange={setPassword}
        value={password}
        secureTextEntry={true}
      />

      <View
        className={clsx(
          "mt-[16px] justify-between",
          direction === "ltr" ? "flex-row" : "flex-row-reverse"
        )}
      >
        <Link
          onClick={() => router.push("/reset-password")}
          value={t("VERIFY_SIGN_IN__FORGOT_PASSWORD")}
        />
      </View>
    </Form>
  );
};

export default SignIn;
