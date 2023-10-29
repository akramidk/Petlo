"use client";

import clsx from "clsx";
import Link from "next/link";
import ReactPixel from "react-facebook-pixel";
import { track } from "@vercel/analytics";

export const DownloadButton = ({
  type,
  text,
  lang,
}: {
  type: "ios" | "android";
  text: string;
  lang: "en" | "ar";
}) => {
  return (
    <Link
      href={
        type === "ios"
          ? "https://apps.apple.com/us/app/id6462346697"
          : "https://play.google.com/store/apps/details?id=com.petlo"
      }
      className={clsx(
        "bg-[#000] w-[192px] h-[52px] text-[#fff] flex  justify-center items-center text-[13px] font-bold rounded-[4px] bg-gradient-to-b from-[#222] to-[#604B9A]",
        lang === "en" ? "flex-row" : "flex-row-reverse"
      )}
      target="_blank"
      onClick={() => {
        ReactPixel.track("Lead");
        track("Lead");
      }}
    >
      <div>{type === "ios" ? <IOSIcon /> : <AndroidIcon />}</div>
      <div
        className={clsx("pt-[2px]", lang === "en" ? "ml-[6px]" : "mr-[6px]")}
      >
        {text}
      </div>
    </Link>
  );
};

const IOSIcon = () => {
  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5284 9.57236C12.5075 7.29834 14.4356 6.19202 14.5238 6.14051C13.4318 4.58616 11.7393 4.37378 11.1445 4.35685C9.723 4.2108 8.34412 5.18729 7.62 5.18729C6.88142 5.18729 5.76633 4.37096 4.56451 4.39495C3.01798 4.41823 1.57117 5.29242 0.777672 6.64993C-0.859919 9.41785 0.361409 13.4854 1.93035 15.7228C2.71518 16.8185 3.63225 18.0419 4.83263 17.9989C6.00698 17.9516 6.44565 17.2679 7.86282 17.2679C9.26699 17.2679 9.67891 17.9989 10.9031 17.9714C12.1635 17.9516 12.957 16.8707 13.7144 15.7651C14.6213 14.5092 14.9855 13.2723 15 13.2088C14.9704 13.199 12.5523 12.298 12.5284 9.57236Z"
        fill="white"
      />
      <path
        d="M10.2159 2.88504C10.8475 2.11386 11.2796 1.06469 11.1597 0C10.2455 0.0395115 9.10221 0.617367 8.44385 1.37161C7.86137 2.03625 7.34104 3.12564 7.47546 4.15012C8.50239 4.22491 9.55678 3.64423 10.2159 2.88504Z"
        fill="white"
      />
    </svg>
  );
};

const AndroidIcon = () => {
  return (
    <svg
      width="15"
      height="17"
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.282864 0.693595C0.103691 0.876466 0 1.16118 0 1.52989V14.6817C0 15.0504 0.103691 15.3352 0.282864 15.518L0.327086 15.5582L7.88589 8.1913V8.01735L0.327086 0.65048L0.282864 0.693595Z"
        fill="white"
      />
      <path
        d="M11.3177 10.6482L8.8009 8.19129V8.01734L11.3208 5.56048L11.3772 5.59245L14.3614 7.24795C15.213 7.71776 15.213 8.49087 14.3614 8.96366L11.3772 10.6162L11.3177 10.6482V10.6482Z"
        fill="white"
      />
      <path
        d="M10.9197 11.0737L8.34339 8.56179L0.740356 15.9755C1.02322 16.2654 1.4845 16.3003 2.00905 16.0104L10.9197 11.0737"
        fill="white"
      />
      <path
        d="M10.9197 5.135L2.00905 0.198229C1.4845 -0.0887146 1.02322 -0.0537769 0.740356 0.23614L8.34339 7.64687L10.9197 5.135Z"
        fill="white"
      />
    </svg>
  );
};
