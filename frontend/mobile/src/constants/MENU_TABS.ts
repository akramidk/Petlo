import { MENU_PATHS } from "./MENU_PATHS";

export const MENU_TABS: {
  id: string;
  value: string;
  path: typeof MENU_PATHS[number];
}[] = [
  {
    id: "HOME",
    value: "COMMON__HOME",
    path: "/",
  },
  {
    id: "ORDERS",
    value: "COMMON__ORDERS",
    path: "/orders",
  },
  {
    id: "AUTOSHIP",
    value: "COMMON__AUTOSHIP",
    path: "/autoship",
  },
  {
    id: "MORE",
    value: "COMMON__MORE",
    path: "/more",
  },
];
