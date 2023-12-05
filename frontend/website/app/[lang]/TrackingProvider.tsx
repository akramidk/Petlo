"use client";

import { useEffect } from "react";

export const TrackingProvider = () => {
  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((lib) => {
        lib.init("3633054593643576", undefined, {
          debug: true,
          autoConfig: false,
        });

        lib.pageView();
      });
  }, []);

  return null;
};
