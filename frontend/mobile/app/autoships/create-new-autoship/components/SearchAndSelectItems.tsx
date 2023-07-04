import { SearchFiled } from "../../../../src/components/atoms";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Modal from "react-native-modal";
import { useState } from "react";
import { useAPIFetching } from "../../../../src/hooks";
import { SearchRequest, SearchResponse } from "../../../../src/interfaces";
import { Endpoints } from "../../../../src/enums";
import { View } from "react-native";
import { Item } from "../../../../src/components/molecules";

interface SearchAndSelectItemsProps {
  onClose: () => void;
}

const SearchAndSelectItems = ({ onClose }: SearchAndSelectItemsProps) => {
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
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{ margin: 0 }}
      isVisible
    >
      <BottomSheet
        snapPoints={["80%"]}
        onClose={onClose}
        animateOnMount
        enablePanDownToClose
      >
        <SearchFiled
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <BottomSheetScrollView style={{ padding: 28 }}>
          {response?.body?.data?.map((item, i) => {
            return (
              <View key={i}>
                <Item variant="large" data={item} />
              </View>
            );
          })}
        </BottomSheetScrollView>
      </BottomSheet>
    </Modal>
  );
};

export default SearchAndSelectItems;
