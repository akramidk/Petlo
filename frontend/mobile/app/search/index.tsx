import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SearchFiled } from "../../src/components/atoms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching } from "../../src/hooks";

const Search = () => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const { response } = useAPIFetching<{ value: string }, undefined>({
    endpoint: Endpoints.SEARCH,
    options: {
      wait: searchValue.trim().length > 0,
    },
    body: {
      value: searchValue,
    },
  });

  return (
    <View className="h-full flex flex-col">
      <SearchFiled
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onCancel={router.back}
      />

      <ScrollView className="grow"></ScrollView>
    </View>
  );
};

export default Search;
