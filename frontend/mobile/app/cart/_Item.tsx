import clsx from "clsx";
import { Fragment } from "react";
import { View, Image } from "react-native";
import { Link, Text } from "../../src/components/atoms";
import { Endpoints } from "../../src/enums";
import {
  useAPIMutation,
  useCartStore,
  useInternationalizationContext,
} from "../../src/hooks";
import {
  CartAddItemRequest,
  CartAddItemResponse,
  CartItemProps,
} from "../../src/interfaces";

const Item = ({
  itemId,
  variantId,
  options,
  name,
  image,
  quantity,
  amount,
}: CartItemProps) => {
  const { direction } = useInternationalizationContext();
  const { cartId, setSummary, setNumberofItems } = useCartStore();

  const {
    response: addResponse,
    trigger: addTrigger,
    status: addStatus,
  } = useAPIMutation<CartAddItemRequest, CartAddItemResponse>({
    endpoint: Endpoints.CART_ADD_ITEM,
    method: "POST",
    slugs: {
      publicId: cartId,
    },
    options: {
      onSucceeded: () => {
        setSummary(addResponse.body.cart);
        setNumberofItems(addResponse.body.cart.number_of_items);
      },
      resetSucceededStatusAfter: 500,
    },
  });

  const {
    response: removeResponse,
    trigger: removeTrigger,
    status: removeStatus,
  } = useAPIMutation<CartAddItemRequest, CartAddItemResponse>({
    endpoint: Endpoints.CART_REMOVE_ITEM,
    method: "DELETE",
    slugs: {
      publicId: cartId,
    },
    options: {
      onSucceeded: () => {
        setSummary(removeResponse.body.cart);
        setNumberofItems(removeResponse.body.cart.number_of_items);
      },
      resetSucceededStatusAfter: 500,
    },
  });

  return (
    <View
      className={clsx(
        "h-[72px]",
        direction === "ltr" ? "flex-row" : "flex-row-reverse"
      )}
    >
      <View
        className={clsx(
          "h-[72px] w-[72px] p-[12px] bg-[#f9f9f9]",
          direction === "ltr" ? "mr-[16px]" : "ml-[16px]"
        )}
      >
        <Image
          style={{
            flex: 1,
            resizeMode: "contain",
          }}
          source={{
            uri: image,
          }}
        />
      </View>

      <View className="flex-1">
        <View className="space-y-[2px]">
          <Text
            font="bold"
            cn="text-[#0E333C] text-[14.5px]"
            style={{
              overflow: "hidden",
            }}
            numberOfLines={1}
          >
            {name}
          </Text>

          <View
            className={clsx(
              direction === "ltr" ? "flex-row" : "flex-row-reverse"
            )}
          >
            {options.map((option, i) => {
              return (
                <View
                  key={i}
                  className={direction === "ltr" ? "mr-[6px]" : "ml-[6px]"}
                >
                  <Text font="medium" cn="text-[#777] text-[14px]">
                    {option}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View
          className={clsx(
            "absolute bottom-0",
            direction === "ltr" ? "self-start" : "self-end"
          )}
        >
          <Text font="semiBold" cn="text-[#666] text-[14.5px]">
            {amount}
          </Text>
        </View>

        <View
          className={clsx(
            "absolute bottom-0 self-end flex-row items-center",
            direction === "ltr" ? "self-end" : "self-start"
          )}
        >
          <Link
            onClick={() =>
              removeTrigger({
                item_id: itemId,
                variant_id: variantId,
              })
            }
            status={removeStatus}
            value="-"
            cn="px-[12px]"
            valueCN="text-[18px]"
          />
          <Text font="extraBold" cn="text-[15px] text-[#0E333C] ">
            {quantity}
          </Text>
          <Link
            onClick={() =>
              addTrigger({
                item_id: itemId,
                variant_id: variantId,
              })
            }
            value="+"
            status={addStatus}
            cn="px-[12px]"
            valueCN="text-[18px]"
          />
        </View>
      </View>
    </View>
  );
};

export default Item;
