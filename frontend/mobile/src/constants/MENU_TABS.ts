export const MENU_TABS: {
  id: string;
  value: string;
  path: string;
  hideIfNoCustomer: boolean;
}[] = [
  {
    id: "HOME",
    value: "COMMON__HOME",
    path: "/",
    hideIfNoCustomer: false,
  },
  {
    id: "ORDERS",
    value: "COMMON__ORDERS",
    path: "/orders",
    hideIfNoCustomer: true,
  },
  {
    id: "AUTOSHIPS",
    value: "COMMON__AUTOSHIPS",
    path: "/autoships",
    hideIfNoCustomer: false,
  },
  {
    id: "MORE",
    value: "COMMON__MORE",
    path: "/more",
    hideIfNoCustomer: false,
  },
];
