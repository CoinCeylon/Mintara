import { IconProps } from "@lib/types";
import React from "react";

export const Icons = {
  topLeftBorder: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={21}
      fill="none"
      {...props}
    >
      <path stroke="#11B55F" d="M1 20.5V1h20" />
    </svg>
  ),
  topRightBorder: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={21}
      fill="none"
      {...props}
    >
      <path stroke="#11B55F" d="M.5 1H20v20" />
    </svg>
  ),
  bottomLeftBorder: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={21}
      fill="none"
      {...props}
    >
      <path stroke="#11B55F" d="M20.5 20H1V0" />
    </svg>
  ),
  bottomRightBorder: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={21}
      fill="none"
      {...props}
    >
      <path stroke="#11B55F" d="M20 .5V20H0" />
    </svg>
  ),
};
