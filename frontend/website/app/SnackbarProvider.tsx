"use client";

import { SnackbarProvider as NotistackSnackbarProvider } from "notistack";

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <NotistackSnackbarProvider
      autoHideDuration={3000}
      variant="error"
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      hideIconVariant
      maxSnack={1}
    >
      {children}
    </NotistackSnackbarProvider>
  );
};
