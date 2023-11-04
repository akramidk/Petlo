"use client";

import Cookies from "js-cookie";

type event = "pageView" | "downloadButtonClick";
const eventPath: { [key in event]: string } = {
  pageView: "/api/tracking/page-view",
  downloadButtonClick: "/api/tracking/download-button-click",
};

const origin =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://petlo.co";

export const track = async (event: event) => {
  console.log({
    url: window.location.href,
    fbp: Cookies.get("_fbp"),
    fbc: Cookies.get("_fbc"),
    userAgent: navigator.userAgent,
  });

  fetch(`${origin}${eventPath[event]}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: window.location.href,
      fbp: Cookies.get("_fbp"),
      fbc: Cookies.get("_fbc"),
      userAgent: navigator.userAgent,
    }),
  }).catch((error) => console.log(error));
};
