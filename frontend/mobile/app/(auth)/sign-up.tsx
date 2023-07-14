import { useRouter, useSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Filed, Selector, FiledWithSelector } from "../../src/components/atoms";
import { PageStructure } from "../../src/components/organisms";
import {
  COUNTRIES_OPTIONS,
  COUNTIES_PHONE_CODE_OPTIONS,
} from "../../src/constants";
import { Endpoints } from "../../src/enums";
import { useTranslationsContext, useAPIMutation } from "../../src/hooks";
import {
  CountryOption,
  BaseOption,
  CreateNewCustomerRequest,
  CreateNewCustomerResponse,
} from "../../src/interfaces";

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

  const { response, trigger, status } = useAPIMutation<
    CreateNewCustomerRequest,
    CreateNewCustomerResponse
  >({
    endpoint: Endpoints.CREATE_NEW_CUSTOMER,
    method: "POST",
    options: {
      onSucceeded: () => {
        router.replace(
          `/verify-your-account?${new URLSearchParams({
            phoneNumber: countryCode.value + phoneNumber,
            sessionToken: response.body.customer.session_token,
          }).toString()}`
        );
      },
      fireOnSucceededAfter: 1000,
    },
  });

  return (
    <PageStructure
      title={t("SIGN_UP__TITLE")}
      backButton={() => router.back()}
      button={{
        value: t("SIGN_UP__BUTTON"),
        onClick: () =>
          trigger({
            name: name,
            country: country.key,
            phone_number: countryCode.value + phoneNumber,
            password: password,
          }),
        status: status ?? buttonStatus,
      }}
    >
      <Filed
        cn="mb-[16px]"
        name={t("SIGN_UP__NAME_FILED_LABEL")}
        require={true}
        placeholder={t("SIGN_UP__NAME_FILED_PLACEHOLDER")}
        onChange={setName}
        value={name}
      />

      <Selector<CountryOption>
        cn="mb-[16px]"
        name={t("SIGN_UP__COUNTRY_FILED_LABEL")}
        require={true}
        placeholder={t("SIGN_UP__COUNTRY_FILED_PLACEHOLDER")}
        options={COUNTRIES_OPTIONS} // TODO should be from the backend
        signalSelect={{
          selectedOption: country,
          setSelectedOption: setCountry,
        }}
        translate
      />

      <FiledWithSelector
        cn="mb-[16px]"
        name={t("SIGN_UP__PHONE_NUMBER_FILED_LABEL")}
        helperText={t("COMMON__PHONE_NUMBER_WITHOUT_ZERO")}
        require={true}
        placeholder={t("SIGN_UP__PHONE_NUMBER_FILED_PLACEHOLDER")}
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
        name={t("SIGN_UP__PASSWORD_FILED_LABEL")}
        helperText={t("SIGN_UP__PASSWORD_FILED_HELPER_TEXT")}
        require={true}
        placeholder={t("SIGN_UP__PASSWORD_FILED_PLACEHOLDER")}
        onChange={setPassword}
        value={password}
        secureTextEntry={true}
      />
    </PageStructure>
  );
};

export default SignUp;
