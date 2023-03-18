import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { AlertContext } from "../contexts";

type variant = "succeeded" | "failed";
interface Alert {
  variant: variant;
  value: string;
  hideAfter: number;
}

const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<Alert>(undefined);
  const variantColors: Record<variant, string> = {
    failed: "bg-[#E64848]",
    succeeded: "bg-[#444]",
  };

  useEffect(() => {
    if (alert === undefined) return;

    Toast.show({
      type: "custom",
      props: { variant: alert.variant, value: alert.value },
    });
  }, [alert]);

  const toastConfig = {
    custom: ({ props }) => (
      <View
        className={clsx(
          "self-center rounded-[4px] p-[16px] mx-[28px] shadow-lg",
          variantColors[props.variant]
        )}
      >
        <Text className="text-[#fff] text-center">{props.value}</Text>
      </View>
    ),
  };

  return (
    <AlertContext.Provider value={setAlert}>
      {children}
      <Toast
        config={toastConfig}
        visibilityTime={alert?.hideAfter ?? 0}
        position="top"
      />
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
