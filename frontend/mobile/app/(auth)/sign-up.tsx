import { useState } from "react";
import { Filed, Selector, FiledWithSelector } from "../../src/components/atoms";
import { Form } from "../../src/components/organisms";
import {
  COUNTRIES_OPTIONS,
  COUNTIES_PHONE_CODE_OPTIONS,
} from "../../src/constants";
import { useTranslationsContext } from "../../src/hooks";
import { CountryOption, OptionBase } from "../../src/interfaces";

const SignUp = () => {
  const { t } = useTranslationsContext();
  const [name, setName] = useState<string>();
  const [country, setCountry] = useState<CountryOption>(
    COUNTRIES_OPTIONS.find((country) => country.key === "JO")
  );
  const [countryCode, setCountryCode] = useState<OptionBase>(
    COUNTIES_PHONE_CODE_OPTIONS.find((code) => code.value === "+962")
  );
  const [phoneNumber, setPhoneNumber] = useState<string>();

  return (
    <Form
      title={t("SIGN_UP_TITLE")}
      button={{
        value: t("SIGN_UP_BUTTON"),
        onClick: () => {},
      }}
    >
      <Filed
        cn="mb-[16px]"
        label={{ name: t("SIGN_UP_NAME_FILED_LABEL"), require: true }}
        placeholder={t("SIGN_UP_NAME_FILED_PLACEHOLDER")}
        onChange={setName}
        value={name}
      />

      <Selector<CountryOption>
        cn="mb-[16px]"
        label={{
          name: t("SIGN_UP_COUNTRY_FILED_LABEL"),
          require: true,
        }}
        placeholder={t("SIGN_UP_COUNTRY_FILED_PLACEHOLDER")}
        options={COUNTRIES_OPTIONS} // TODO should be from the backend
        value={country}
        setValue={setCountry}
        translate
      />

      <FiledWithSelector
        label={{
          name: t("SIGN_UP_PHONE_NUMBER_FILED_LABEL"),
          require: true,
        }}
        placeholder={t("SIGN_UP_PHONE_NUMBER_FILED_PLACEHOLDER")}
        options={COUNTIES_PHONE_CODE_OPTIONS}
        optionValue={countryCode}
        setOptionValue={setCountryCode}
        filedValue={phoneNumber}
        onChangeFiledValue={setPhoneNumber}
        keyboardType="number-pad"
      />
    </Form>
  );
};

export default SignUp;
