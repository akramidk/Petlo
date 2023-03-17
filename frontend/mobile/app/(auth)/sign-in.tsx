import { useRouter } from "expo-router";
import { Form } from "../../src/components/organisms";
import { useAPIMutation, useTranslationsContext } from "../../src/hooks";
import { FiledWithSelector, Filed } from "../../src/components/atoms";
import { useMemo, useState } from "react";
import { COUNTIES_PHONE_CODE_OPTIONS } from "../../src/constants";
import {
  BaseOption,
  CreateSessionRequest,
  CreateSessionResponse,
} from "../../src/interfaces";
import { Endpoints } from "../../src/enums";

const SignIn = () => {
  const { t } = useTranslationsContext();
  const router = useRouter();

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
    options: {},
  });

  return (
    <Form
      title={t("SIGN_IN_TITLE")}
      backButton={() => router.back()}
      button={{
        value: t("SIGN_UP_BUTTON"),
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
        name={t("SIGN_IN_PHONE_NUMBER_LABEL")}
        require={true}
        placeholder={t("SIGN_IN_PHONE_NUMBER_PLACEHOLDER")}
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
        name={t("SIGN_IN_PASSWORD_FILED_LABEL")}
        require={true}
        placeholder={t("SIGN_IN_PASSWORD_FILED_PLACEHOLDER")}
        onChange={setPassword}
        value={password}
        secureTextEntry={true}
      />
    </Form>
  );
};

export default SignIn;
