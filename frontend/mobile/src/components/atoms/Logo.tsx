import clsx from "clsx";
import { Text } from "react-native";

interface LogoProps {
  cn?: string;
}

const Logo = ({ cn }: LogoProps) => {
  return (
    <Text className={clsx("font-chillax-bold text-[#0E333C]", cn)}>petlo</Text>
  );
};

export default Logo;
