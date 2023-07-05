import { SearchFiled, Text } from "../../../../src/components/atoms";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Modal from "react-native-modal";
import { useState } from "react";
import { useAPIFetching } from "../../../../src/hooks";
import { SearchRequest, SearchResponse } from "../../../../src/interfaces";
import { Endpoints } from "../../../../src/enums";
import { View } from "react-native";
import { Item } from "../../../../src/components/molecules";
import { ItemPreview } from "../../../../src/components/pages";
import { SafeAreaView } from "react-native-safe-area-context";

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

  const [openedItemPublicId, setOpendItemPublicId] = useState<string>();

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
                <Item
                  variant="large"
                  data={item}
                  onClick={() => setOpendItemPublicId(item.public_id)}
                />
              </View>
            );
          })}
        </BottomSheetScrollView>
      </BottomSheet>

      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={{ margin: 0 }}
        isVisible={!!openedItemPublicId}
      >
        <BottomSheet
          snapPoints={["90%"]}
          onClose={() => setOpendItemPublicId(undefined)}
          animateOnMount
          enablePanDownToClose
        >
          <ItemPreview
            publicId={openedItemPublicId}
            onBack={() => setOpendItemPublicId(undefined)}
            onAdd={() => {}}
            addTranslationValue="add"
            bottomContainerCN="pb-[32px]"
          />
        </BottomSheet>
      </Modal>
    </Modal>
  );
};

export default SearchAndSelectItems;
