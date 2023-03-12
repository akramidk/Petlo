import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Filed, Selector, FiledWithSelector } from "../../src/components/atoms";
import { Form } from "../../src/components/organisms";
import {
  COUNTRIES_OPTIONS,
  COUNTIES_PHONE_CODE_OPTIONS,
} from "../../src/constants";
import { Endpoints } from "../../src/enums";
import { useTranslationsContext, useAPIMutation } from "../../src/hooks";
import { CountryOption, BaseOption } from "../../src/interfaces";

const SignUp = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<CountryOption>(
    COUNTRIES_OPTIONS.find((country) => country.key === "JO")
  );
  const [countryCode, setCountryCode] = useState<BaseOption>(
    COUNTIES_PHONE_CODE_OPTIONS.find((code) => code.value === "+962")
  ); // TODO Pagination to improve performance
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const buttonStatus: "active" | "inactive" = useMemo(() => {
    if (
      name.trim().length > 0 &&
      country &&
      countryCode &&
      phoneNumber.trim().length > 0 &&
      password.trim().length >= 8
    ) {
      return "active";
    }

    return "inactive";
  }, [name, country, countryCode, phoneNumber, password]);

  const { response, trigger } = useAPIMutation<
    unknown,
    { customer: { session_token: string } }
  >({
    endpoint: Endpoints.CreateNewCustomer,
    method: "POST",
    onSucceeded: (data) =>
      router.replace(
        `/verify-your-account?phoneNumber=${
          countryCode.value + phoneNumber
        }&sessionToken=${data.customer.session_token}`
      ),
  });

  return (
    <Form
      title={t("SIGN_UP_TITLE")}
      backButton={() => router.back()}
      button={{
        value: t("SIGN_UP_BUTTON"),
        onClick: () =>
          trigger({
            name: name,
            country: country.key,
            phone_number: countryCode.value + phoneNumber,
            password: password,
          }),
        status: response?.status ?? buttonStatus,
      }}
    >
      <Filed
        cn="mb-[16px]"
        name={t("SIGN_UP_NAME_FILED_LABEL")}
        require={true}
        placeholder={t("SIGN_UP_NAME_FILED_PLACEHOLDER")}
        onChange={setName}
        value={name}
      />

      <Selector<CountryOption>
        cn="mb-[16px]"
        name={t("SIGN_UP_COUNTRY_FILED_LABEL")}
        require={true}
        placeholder={t("SIGN_UP_COUNTRY_FILED_PLACEHOLDER")}
        options={COUNTRIES_OPTIONS} // TODO should be from the backend
        value={country}
        setValue={setCountry}
        translate
      />

      <FiledWithSelector
        cn="mb-[16px]"
        name={t("SIGN_UP_PHONE_NUMBER_FILED_LABEL")}
        require={true}
        placeholder={t("SIGN_UP_PHONE_NUMBER_FILED_PLACEHOLDER")}
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
        name={t("SIGN_UP_PASSWORD_FILED_LABEL")}
        helperText={t("SIGN_UP_PASSWORD_FILED_HELPER_TEXT")}
        require={true}
        placeholder={t("SIGN_UP_PASSWORD_FILED_PLACEHOLDER")}
        onChange={setPassword}
        value={password}
        secureTextEntry={true}
      />
    </Form>
  );
};

export default SignUp;
