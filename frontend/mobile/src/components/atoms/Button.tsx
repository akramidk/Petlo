import clsx from "clsx";
import React from "react";
import { Pressable } from "react-native";
import { ButtonProps } from "../../interfaces";
import Text from "./Text";
import { ActivityIndicator } from "react-native-paper";
import { CheckIcon, XMarkIcon } from "react-native-heroicons/outline";

const Button = ({ value, status = "active", onClick }: ButtonProps) => {
  const TextChild = () => {
    return (
      <Text
        cn={clsx(
          "text-[15px]",
          status === "active" ? "text-[#fff]" : "text-[#888888]"
        )}
        font={["font-e800", "font-a700"]}
      >
        {value}
      </Text>
    );
  };

  const statuses: Record<
    ButtonProps["status"],
    { child: React.ReactNode; className: string }
  > = {
    active: {
      child: <TextChild />,
      className: "bg-[#76C7C9]",
    },
    inactive: {
      child: <TextChild />,
      className: "bg-[#f6f6f6]",
    },
    loading: {
      child: <ActivityIndicator animating={true} color="#0E333C" size={20} />,
      className: "bg-[#f6f6f6]",
    },
    succeeded: {
      child: <CheckIcon color="#fff" size={20} strokeWidth={3} />,
      className: "bg-[#76C7C9]",
    },
    failed: {
      child: <XMarkIcon color="#fff" size={20} strokeWidth={3} />,
      className: "bg-[#E64848]",
    },
  };

  return (
    <Pressable
      className={clsx(
        "h-[60px] rounded-[4px] justify-center items-center",
        statuses[status].className
      )}
      onPress={onClick}
      disabled={status === "inactive"}
    >
      {statuses[status].child}
    </Pressable>
  );
};

export default Button;
