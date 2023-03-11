import { useSearchParams } from "expo-router";
import { Text, View } from "react-native";

const VerifyYourAccount = () => {
  const { phone_number, session_token } = useSearchParams();

  return (
    <View>
      <Text>VerifyYourAccount</Text>
      <Text>{phone_number}</Text>
      <Text>{session_token}</Text>
    </View>
  );
};

export default VerifyYourAccount;
