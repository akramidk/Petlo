import { useRouter } from "expo-router";
import { View, Image } from "react-native";
import { Button, Text } from "../../src/components/atoms";
import { BaseButton } from "../../src/components/bases";

const Welcome = () => {
  const router = useRouter();

  return (
    <View
      style={{
        backgroundColor: "rgb(232, 228, 215)",
      }}
      className="grow py-[52px]"
    >
      <View className="absolute bottom-0 mb-[72px] space-y-[36px]">
        <Image
          style={{
            height: 300,
            width: 300,
          }}
          source={require("../../src/assets/images/bowl.webp")}
        />
        <View className="px-[36px]">
          <Text font="extraBold" cn="text-[32px] mb-[12px] text-[#0E333C]">
            Welcome to Petlo
          </Text>

          <View className="flex-row space-x-[8px]">
            <BaseButton
              onClick={() => {
                router.push("/sign-up");
              }}
              cn="w-[50%] h-[52px] bg-[#0E333C] rounded-[4px] items-center justify-center"
            >
              <Text font="semiBold" cn="text-[#eee] text-[14px]">
                Sign Up
              </Text>
            </BaseButton>

            <BaseButton
              onClick={() => {
                router.push("/sign-in");
              }}
              cn="w-[50%] h-[52px] border-[1px] border-[#0E333C] rounded-[4px] items-center justify-center"
            >
              <Text font="semiBold" cn="text-[#0E333C] text-[14px]">
                Sign Up
              </Text>
            </BaseButton>
          </View>
        </View>
      </View>
    </View>
  );

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
