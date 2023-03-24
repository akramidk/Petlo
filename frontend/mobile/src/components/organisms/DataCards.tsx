import { View } from "react-native";
import { DataCard } from "../molecules";
import { DataCardProps } from "../../interfaces";

interface DataCardsProps {
  data: DataCardProps[];
}

const DataCards = ({ data }: DataCardsProps) => {
  return (
    <View className="space-y-[4px]">
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
