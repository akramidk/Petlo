"use client";

import { useEffect } from "react";
import { track } from "../utils/track";

export const TrackingProvider = () => {
  useEffect(() => {
    track("pageView");
  }, []);

  return null;
};
