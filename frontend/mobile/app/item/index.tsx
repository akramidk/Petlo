import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Endpoints, StorageKeys } from "../../src/enums";
import {
  useAPIMutation,
  useCartStore,
  useCustomerContext,
  useTranslationsContext,
} from "../../src/hooks";
import {
  CartAddItemRequest,
  CartAddItemResponse,
  CreateNewCartResponse,
} from "../../src/interfaces";
import { ItemPreview } from "../../src/components/pages";
import { Pressable, View } from "react-native";
import { Text } from "../../src/components/atoms";

const Item = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { publicId } = useLocalSearchParams<{ publicId: string }>();
  const { customer } = useCustomerContext();

  const cartStore = useCartStore();
  const {
    response: createResponse,
    trigger: createTrigger,
    status: createStatus,
  } = useAPIMutation<void, CreateNewCartResponse>({
    endpoint: Endpoints.CREATE_NEW_CART,
    method: "POST",
    options: {
      onSucceeded: () => {
        AsyncStorage.setItem(
          StorageKeys.CART,
          createResponse.body.cart.public_id
        );
        cartStore.setCartId(createResponse.body.cart.public_id);
        cartStore.setSummary(createResponse.body.cart);
      },
      resetSucceededStatusAfter: 500,
    },
  });

  const {
    response: addResponse,
    trigger: addTrigger,
    status: addStatus,
  } = useAPIMutation<CartAddItemRequest, CartAddItemResponse>({
    endpoint: Endpoints.CART_ADD_ITEM,
    method: "POST",
    slugs: {
      publicId: cartStore.cartId ?? createResponse?.body?.cart?.public_id,
    },
    options: {
      onSucceeded: () => {
        cartStore.setSummary(addResponse.body.cart);
        cartStore.setNumberofItems(addResponse.body.cart.number_of_items);
      },
      resetSucceededStatusAfter: 500,
    },
  });

  const addToCart = useCallback(
    async (itemId: string, variantId: string) => {
      if (!cartStore.cartId) {
        await createTrigger(undefined);
      }

      addTrigger({
        item_id: itemId,
        variant_id: variantId,
      });
    },
    [cartStore.cartId]
  );

  return (
    <ItemPreview
      publicId={publicId}
      onAdd={(itemId, variantId) => addToCart(itemId, variantId)}
      addStatus={addStatus ?? createStatus}
      onBack={router.back}
      addTranslationValue={t("ITEM__ADD_TO_CART_BUTTON")}
      addButtonDisabled={customer === null}
      bottomContainerElement={
        customer === null ? (
          <Pressable
            className="items-center pb-[16px] space-y-[4px]"
            onPress={() => {
              router.push("/welcome");
            }}
          >
            <Text font="semiBold" cn="text-[14px] text-[#444]">
              {t("ITEM__NO_CUSTOMER_WARNING_1")}
            </Text>

            <Text font="bold" cn="text-[14px] text-[222]">
              {t("ITEM__NO_CUSTOMER_WARNING_2")}
            </Text>
          </Pressable>
        ) : undefined
      }
    />
  );
};

export default Item;
