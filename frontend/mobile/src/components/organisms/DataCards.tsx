import { View } from "react-native";
import { DataCard } from "../molecules";
import { DataCardProps } from "../../interfaces";

import clsx from "clsx";

interface DataCardsProps {
  data: DataCardProps[];
  cn?: string;
}

const DataCards = ({ data, cn }: DataCardsProps) => {
  return (
    <View className={clsx("space-y-[4px]", cn)}>
      {data.map((item, i) => {
        return (
          <View key={i}>
            <DataCard {...item} />
          </View>
        );
      })}
    </View>
  );
};

export default DataCards;
