import { useRouter } from "expo-router";
import { View, Image } from "react-native";
import { Button, Logo, Text } from "../../src/components/atoms";
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
      <View className="items-center px-[36px]">
        <Image
          style={{
            height: 300,
            width: 300,
          }}
          source={require("../../src/assets/images/bowl.webp")}
        />

        <Text font="light" cn="text-[48px] text-[#0E333C]">
          Welcome to
        </Text>

        <Logo cn="text-[52px] text-[#0E333C]" />
      </View>

      <View className="absolute bottom-0 mb-[52px] px-[36px] flex-row space-x-[8px]">
        <BaseButton
          onClick={() => {
            router.push("/sign-up");
          }}
          cn="grow h-[52px] bg-[#0E333C] rounded-[4px] items-center justify-center"
        >
          <Text font="semiBold" cn="text-[#eee] text-[14px]">
            Sign Up
          </Text>
        </BaseButton>

        <BaseButton
          onClick={() => {
            router.push("/sign-in");
          }}
          cn="grow h-[52px] border-[1px] border-[#0E333C] rounded-[4px] items-center justify-center"
        >
          <Text font="semiBold" cn="text-[#0E333C] text-[14px]">
            Sign In
          </Text>
        </BaseButton>
      </View>
    </View>
  );
};

export default Welcome;
