import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "../../src/components/atoms";

const Welcome = () => {
  const router = useRouter();
  return (
    <View>
      <Button
        value="Sign Up"
        onClick={() => {
          router.push("/sign-up");
        }}
      />

      <Button
        value="Sign In"
        onClick={() => {
          router.push("/sign-in");
        }}
      />
    </View>
  );
};

export default Welcome;
