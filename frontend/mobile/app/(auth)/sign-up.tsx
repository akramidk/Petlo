import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Filed, Selector } from "../../src/components/atoms";
import { Form } from "../../src/components/organisms";
import { COUNTRIES_OPTIONS } from "../../src/constants";
import { useTranslationsContext } from "../../src/hooks";
import { CountryOption } from "../../src/interfaces";

const SignUp = () => {
  const { t } = useTranslationsContext();
  const [country, setCountry] = useState<CountryOption>();

  console.log("t(country?.value)", t(country?.value));

  return (
    <Form
      title={t("SIGN_UP_TITLE")}
      button={{
        value: t("SIGN_UP_BUTTON"),
        onClick: () => {},
      }}
    >
      <Filed
        label={{ name: t("SIGN_UP_NAME_FILED_LABEL"), require: true }}
        placeholder={t("SIGN_UP_NAME_FILED_PLACEHOLDER")}
        onChange={(value) => {
          console.log(value);
        }}
      />

      <Selector<CountryOption>
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
    </Form>
  );
};

export default SignUp;
