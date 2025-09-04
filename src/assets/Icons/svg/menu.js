import React from "react";
import Svg, { Path, G } from "react-native-svg";

export function MenuIcon({ color = "#000"}) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 32 32"
      fill="none"
    >
        <Path
          d="M30 7a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h26a1 1 0 0 1 1 1zm-5 8H3a1 1 0 0 0 0 2h22a1 1 0 0 0 0-2zm-9 9H3a1 1 0 0 0 0-2h13a1 1 0 0 0 0-2z"
          fill={color}
        />
    </Svg>
  );
}
