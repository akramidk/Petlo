import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Filed, Selector, FiledWithSelector } from "../../src/components/atoms";
import { Form } from "../../src/components/organisms";
import { COUNTRIES_OPTIONS } from "../../src/constants";
import { useTranslationsContext } from "../../src/hooks";
import { CountryOption } from "../../src/interfaces";

const SignUp = () => {
  const { t } = useTranslationsContext();
  const [name, setName] = useState<string>();
  const [country, setCountry] = useState<CountryOption>();
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

      <FiledWithSelector />
    </Form>
  );
};

export default SignUp;
