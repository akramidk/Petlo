"use client";

import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

export const TrackingProvider = () => {
  useEffect(() => {
    ReactPixel.init("3633054593643576", undefined, {
      debug: true,
      autoConfig: false,
    });

    ReactPixel.pageView();
  }, []);

  return null;
};
