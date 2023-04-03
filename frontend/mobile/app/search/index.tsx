import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SearchFiled } from "../../src/components/atoms";

const Search = () => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  return (
    <View>
      <SearchFiled
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onCancel={router.back}
      />
    </View>
  );
};

export default Search;
