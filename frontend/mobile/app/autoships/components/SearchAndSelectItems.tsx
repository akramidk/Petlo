import { SearchFiled, Text } from "../../../src/components/atoms";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Modal from "react-native-modal";
import { useMemo, useState } from "react";
import { useAPIFetching, useTranslationsContext } from "../../../src/hooks";
import {
  Category,
  Item as IItem,
  SearchRequest,
  SearchResponse,
} from "../../../src/interfaces";
import { Endpoints } from "../../../src/enums";
import { View } from "react-native";
import { Item } from "../../../src/components/molecules";
import {
  BrandPage,
  BrandsPage,
  CategoryPage,
  ItemPreview,
  Loading,
} from "../../../src/components/pages";
import { buttonStatus } from "../../../src/types";
import {
  BrandsAndPetsList,
  SectionsItemsWithFilter,
} from "../../../src/components/organisms";
import { ScrollView } from "react-native-gesture-handler";
import { Brand } from "../../../src/interfaces/Entities/Brand";

interface SearchAndSelectItemsProps {
  onClose: () => void;
  addItem: (itemId: string, variantId: string) => void;
  addStatus: buttonStatus | undefined;
}

const SearchAndSelectItems = ({
  onClose,
  addItem,
  addStatus,
}: SearchAndSelectItemsProps) => {
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

  const [openedItemPublicId, setOpendItemPublicId] = useState<string>();
  const [page, setPage] = useState<{
    type: "pet" | "brands" | "brand";
    data?: Brand | Category;
  }>();

  const renderPage = useMemo(() => {
    if (!page) {
      return (
        <>
          <SearchFiled
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onCancel={onClose}
          />

          {searchValue.trim().length === 0 && (
            <ScrollView>
              <View className="p-[28px]">
                <BrandsAndPetsList
                  brandsList={{
                    limit: 6,
                    fetchMore: false,
                    title: t("BRANDS_AND_PETS_LIST__ITEMS_BY_BRAND"),
                    showAllButton: true,
                    onShowAllButtonClick: () => {
                      setPage({ type: "brands" });
                    },
                    onBrandClick: (brand) => {
                      setPage({ type: "brand", data: brand });
                    },
                    featuredBrandsOnly: true,
                  }}
                  petsList={{
                    title: t("BRANDS_AND_PETS_LIST__ITEMS_BY_PET"),
                    onPetClick: (pet) => {
                      setPage({ type: "pet", data: pet });
                    },
                  }}
                />
              </View>
            </ScrollView>
          )}

          <BottomSheetScrollView>
            <View className="grow space-y-[12px] p-[28px]">
              {response?.isFetching ? (
                <Loading />
              ) : searchValue.trim().length > 0 &&
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
                        onClick={() => setOpendItemPublicId(item.public_id)}
                      />
                    </View>
                  );
                })
              )}
            </View>
          </BottomSheetScrollView>
        </>
      );
    }

    if (page.type === "pet") {
      return (
        <CategoryPage
          publicId={page.data.public_id}
          name={page.data.name}
          backButton={() => {
            setPage(undefined);
          }}
          onItemClick={(item) => setOpendItemPublicId(item.public_id)}
        />
      );
    }

    if (page.type === "brands") {
      return (
        <BrandsPage
          backButton={() => {
            setPage(undefined);
          }}
          onBrandClick={(brand) => {
            setPage({ type: "brand", data: brand });
          }}
        />
      );
    }

    if (page.type === "brand") {
      return (
        <BrandPage
          publicId={page.data.public_id}
          name={page.data.name}
          backButton={() => {
            setPage(undefined);
          }}
          onItemClick={(item) => setOpendItemPublicId(item.public_id)}
        />
      );
    }
  }, [page]);

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{ margin: 0 }}
      onBackdropPress={onClose}
      isVisible
    >
      <BottomSheet
        snapPoints={["90%"]}
        onClose={onClose}
        animateOnMount
        enablePanDownToClose
      >
        {renderPage}
      </BottomSheet>

      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={{ margin: 0 }}
        isVisible={!!openedItemPublicId}
        onBackdropPress={() => setOpendItemPublicId(undefined)}
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
            onAdd={addItem}
            addTranslationValue={t("CREATE_AN_AUTOSHIP__ADD_ITEM_TO_AUTOSHIP")}
            bottomContainerCN="pb-[32px]"
            addStatus={addStatus}
          />
        </BottomSheet>
      </Modal>
    </Modal>
  );
};

export default SearchAndSelectItems;
