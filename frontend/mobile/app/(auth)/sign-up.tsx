import { Text, TextInput, View } from "react-native";
import { Filed } from "../../src/components/atoms";
import { Form } from "../../src/components/organisms";
import { useTranslationsContext } from "../../src/hooks";

const SignUp = () => {
  const { t } = useTranslationsContext();

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
    </Form>
  );
};

export default SignUp;
