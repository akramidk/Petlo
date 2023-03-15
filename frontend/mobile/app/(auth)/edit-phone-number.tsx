import { Text, View } from "react-native";
import { useSearchParams } from "expo-router";

const EditPhoneNumber = () => {
  const { sessionToken } = useSearchParams();

  return (
    <View>
      <Text>EditPhoneNumber</Text>
      <Text>{sessionToken}</Text>
    </View>
  );
};

export default EditPhoneNumber;
