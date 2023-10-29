"use client";

import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

export const FacebookPixel = () => {
  useEffect(() => {
    ReactPixel.init("3633054593643576");
    ReactPixel.pageView();
  }, []);

  return null;
};
