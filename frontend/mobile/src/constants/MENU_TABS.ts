import { MENU_PATHS } from "./MENU_PATHS";

export const MENU_TABS: {
  id: string;
  value: string;
  path: typeof MENU_PATHS[number];
}[] = [
  {
    id: "HOME",
    value: "HOME",
    path: "/",
  },
  {
    id: "ORDERS",
    value: "ORDERS",
    path: "/orders",
  },
  {
    id: "AUTOSHIP",
    value: "AUTOSHIP",
    path: "/autoship",
  },
  {
    id: "MORE",
    value: "MORE",
    path: "/more",
  },
];
