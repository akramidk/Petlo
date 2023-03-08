import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Filed, Selector } from "../../src/components/atoms";
import { Form } from "../../src/components/organisms";
import { useTranslationsContext } from "../../src/hooks";
import { OptionBase } from "../../src/interfaces";

const SignUp = () => {
  const { t } = useTranslationsContext();
  const [country, setCountry] = useState<OptionBase>();

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

      {
        // TODO should be from the backend
      }
      <Selector
        label={{
          name: t("SIGN_UP_COUNTRY_FILED_LABEL"),
          require: true,
        }}
        placeholder={t("SIGN_UP_COUNTRY_FILED_PLACEHOLDER")}
        options={[
          { id: 0, value: "+962" },
          { id: 1, value: "+966" },
          { id: 2, value: "+968" },
        ]}
        value={country}
        setValue={setCountry}
      />
    </Form>
  );
};

export default SignUp;
