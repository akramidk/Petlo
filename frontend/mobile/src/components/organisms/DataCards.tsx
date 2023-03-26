import { View } from "react-native";
import { DataCard } from "../molecules";
import { DataCardProps } from "../../interfaces";
import clsx from "clsx";
import { FlashList } from "@shopify/flash-list";
import { Dimensions } from "react-native";
import { useMemo } from "react";

interface DataCardsProps {
  data: DataCardProps[];
  cn?: string;
  onEndReached?: () => void;
}

const DataCards = ({ data, cn, onEndReached }: DataCardsProps) => {
  const height = useMemo(() => {
    return Dimensions.get("window").height * 0.65;
  }, []);

  return (
    <View style={{ height: height }} className={cn}>
      <FlashList
        data={data}
        renderItem={({ item }) => <DataCard {...item} />}
        ItemSeparatorComponent={() => <View className="h-[4px]" />}
        onEndReached={onEndReached}
        estimatedItemSize={74}
        extraData={data}
      />
    </View>
  );
};

export default DataCards;
