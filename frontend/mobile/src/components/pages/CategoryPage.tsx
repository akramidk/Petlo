import { View } from "react-native";
import PageStructure from "../organisms/PageStructure";

interface CategoryPage {
  publicId: string;
  name: string;
  backButton: () => void;
}

const CategoryPage = ({ publicId, name, backButton }: CategoryPage) => {
  return <PageStructure title={name} backButton={backButton}></PageStructure>;
};

export default CategoryPage;
