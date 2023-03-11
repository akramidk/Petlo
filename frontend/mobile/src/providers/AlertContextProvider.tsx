import clsx from "clsx";
import React, { useState } from "react";
import { Modal, SafeAreaView, Text, View } from "react-native";
import { AlertContext } from "../contexts";

type variant = "succeeded" | "failed";
interface Alert {
  variant: variant;
  value: string;
}

const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<Alert>();
  const variantColors: Record<variant, string> = {
    failed: "bg-[#E64848]",
    succeeded: "bg-[#444]",
  };

  return (
    <AlertContext.Provider value={setAlert}>
      <Modal visible={!!alert} transparent={true} animationType="fade">
        <SafeAreaView>
          <View
            className={clsx(
              "self-center rounded-[4px] p-[16px] mx-[28px] shadow-lg",
              variantColors[alert?.variant]
            )}
          >
            <Text className="text-[#fff] text-center">{alert?.value}</Text>
          </View>
        </SafeAreaView>
      </Modal>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
