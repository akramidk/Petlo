import { View } from "react-native";
import Text from "../atoms/Text";

interface FormProps {
  title?: string;
  helperText?: string;
  children?: React.ReactNode;
}

const Form = ({ title, helperText, children }: FormProps) => {
  return (
    <View>
      <View>
        <View className="space-y-[12px] mb-[28px]">
          <Text className="font-e800 text-[32px] text-[#0E333C]">{title}</Text>
          <Text className="font-e500 text-[17px] text-[#888] leading-[28px]">
            {helperText}
          </Text>
        </View>

        {children}
      </View>
    </View>
  );
};

export default Form;
