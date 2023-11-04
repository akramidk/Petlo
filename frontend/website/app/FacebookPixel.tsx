"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

export const FacebookPixel = () => {
  useEffect(() => {
    fetch("/api/tracking/page-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: window.location.href,
        fbp: Cookies.get("_fbp"),
        fbc: Cookies.get("_fbc"),
      }),
    });
  }, []);

  return null;
};
