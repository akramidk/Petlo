"use client";

import { useEffect } from "react";
import { hotjar } from "react-hotjar";

export const HotjarProvider = () => {
  useEffect(() => {
    hotjar.initialize(3723003, 6);
  }, []);

  return null;
};
