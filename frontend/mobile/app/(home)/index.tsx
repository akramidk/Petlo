import { Text } from "react-native";
import { Endpoints } from "../../src/enums";
import { useAPIFetching } from "../../src/hooks";
import Loading from "../_Loading";
import Scrollable from "../_Scrollable";

const Home = () => {
  const { response: sectionsResponse } = useAPIFetching<unknown, unknown>({
    endpoint: Endpoints.SECTIONS,
  });

  if (sectionsResponse.isFetching) {
    return <Loading />;
  }

  return (
    <Scrollable>
      <Text>Home</Text>
    </Scrollable>
  );
};

export default Home;
