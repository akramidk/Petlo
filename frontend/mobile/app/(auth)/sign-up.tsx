import { Text, View } from "react-native";
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
      <Text>ddd</Text>
    </Form>
  );
};

export default SignUp;
