import { View } from "react-native";
import { DataCard } from "../molecules";
import { DataCardProps } from "../../interfaces";
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
    return Dimensions.get("window").height - 350;
  }, []);

  console.log("height", height);

  return (
    <View style={{ height: height }} className={cn}>
      <FlashList
        data={data}
        renderItem={({ item }) => <DataCard {...item} />}
        ItemSeparatorComponent={() => <View className="h-[4px]" />}
        onEndReached={onEndReached}
        estimatedItemSize={77}
        extraData={data}
      />
    </View>
  );
};

export default DataCards;
