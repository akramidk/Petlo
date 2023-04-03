import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SearchFiled } from "../../src/components/atoms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching } from "../../src/hooks";
import { SearchRequest, SearchResponse } from "../../src/interfaces";
import Item from "../(home)/_components/Item";
import Loading from "../_Loading";

const Search = () => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const { response } = useAPIFetching<SearchRequest, SearchResponse>({
    endpoint: Endpoints.SEARCH,
    SWROptions: {
      revalidateIfStale: false,
    },
    options: {
      wait: searchValue.trim().length === 0,
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

      {response?.isFetching ? (
        <Loading />
      ) : (
        <ScrollView className="grow p-[28px]">
          {response?.body?.data?.map((item, i) => {
            return (
              <View key={i}>
                <Item {...item} />
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default Search;
