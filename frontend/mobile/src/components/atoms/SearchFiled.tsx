import clsx from "clsx";
import { TextInput, View } from "react-native";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../hooks";
import BaseButton from "../bases/BaseButton";
import Text from "./Text";

interface SearchFiledProps {
  setSearchValue: (value: string) => void;
  searchValue: string;
  onCancel: () => void;
}

const SearchFiled = ({
  setSearchValue,
  searchValue,
  onCancel,
}: SearchFiledProps) => {
  const { t } = useTranslationsContext();
  const { direction, language } = useInternationalizationContext();

  return (
    <View
      className={clsx(
        "border-b-[1px] border-b-[#f6f6f6] h-[56px] px-[28px] justify-between items-center",
        direction === "ltr" ? "flex-row" : "flex-row-reverse"
      )}
    >
      <TextInput
        placeholder={t("SEARCH_FILED_COMP__SEARCH")}
        placeholderTextColor="#aaa"
        className={clsx(
          "h-full flex-1",
          direction === "ltr" ? "text-left" : "text-right",
          language === "en" ? "font-e500" : "font-a400"
        )}
        onChangeText={setSearchValue}
        value={searchValue}
      />
      <BaseButton onClick={onCancel} cn="h-full justify-center-center">
        <Text
          cn={"text-[#E64848] text-[14px] self-center"}
          font="bold"
          specificCN={{
            languages: {
              en: "tracking-[1px]",
              ar: "",
            },
          }}
        >
          {t("SEARCH_FILED_COMP__CANCEL")}
        </Text>
      </BaseButton>
    </View>
  );
};

export default SearchFiled;
