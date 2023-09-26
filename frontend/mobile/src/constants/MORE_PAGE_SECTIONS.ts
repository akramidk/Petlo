export const MORE_PAGE_SECTIONS: {
  title: string;
  options: {
    icon: string;
    name: string;
    path: string;
    hideIfNoCustomer?: boolean;
  }[];
  hideIfNoCustomer: boolean;
}[] = [
  {
    title: "MORE__ACCOUNT_SECTION_TITLE",
    hideIfNoCustomer: true,
    options: [
      {
        icon: "person",
        name: "MORE__ACCOUNT_INFORMATIONS_OPTION",
        path: "/account/informations",
      },
      {
        icon: "heart",
        name: "MORE__ACCOUNT_PETS_OPTION",
        path: "/account/pets",
      },
      {
        icon: "map",
        name: "MORE__ACCOUNT_ADDRESSES_OPTION",
        path: "/account/addresses",
      },
      {
        icon: "card",
        name: "MORE__ACCOUNT_CARDS_OPTION",
        path: "/account/cards",
      },
    ],
  },
  {
    title: "MORE__APP_SECTION_TITLE",
    hideIfNoCustomer: false,
    options: [
      {
        icon: "language",
        name: "MORE__APP_CHANGE_LANGUAGE_OPTION",
        path: "/chnage-language",
      },
    ],
  },
  {
    title: "MORE__OTHERS_SECTION_TITLE",
    hideIfNoCustomer: false,
    options: [
      {
        icon: "handRaised",
        name: "MORE__OTHERS_REQUEST_A_PRODUCT",
        path: "/request-a-product",
      },
      {
        icon: "support",
        name: "MORE__OTHERS_SUPPORT_AND_FEEDBACK_OPTION",
        path: "/support-and-feedbacks",
      },
      {
        icon: "arrowUturnDown",
        name: "MORE__OTHERS_SIGN_OUT",
        path: "/sign-out",
        hideIfNoCustomer: true,
      },
    ],
  },
];
