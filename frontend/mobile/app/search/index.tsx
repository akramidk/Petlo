import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SearchFiled } from "../../src/components/atoms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching, useTranslationsContext } from "../../src/hooks";
import { SearchRequest, SearchResponse } from "../../src/interfaces";
import { Item } from "../../src/components/molecules";
import { Loading } from "../../src/components/pages";
import { Text } from "../../src/components/atoms";
import SectionsItemsWithFilter from "../../src/components/organisms/SectionsItemsWithFilter";

const Search = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

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

      {searchValue.trim().length === 0 && (
        <SectionsItemsWithFilter onItemClick={() => {}} />
      )}

      {response?.isFetching ? (
        <Loading />
      ) : (
        <ScrollView className="grow px-[28px]">
          <View className="py-[28px] space-y-[12px]">
            {searchValue.trim().length > 0 &&
            response?.body?.data?.length === 0 ? (
              <Text font="medium" cn="text-[#666] text-[14px] self-center">
                {t("COMMON__NOTHING_FOUND")}
              </Text>
            ) : (
              response?.body?.data?.map((item, i) => {
                return (
                  <View key={i}>
                    <Item
                      variant="large"
                      data={item}
                      onClick={() =>
                        router.push(`/item?publicId=${item.public_id}`)
                      }
                    />
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Search;
