import React from "react";
import Svg, { Path } from "react-native-svg";

export function BellIcon({ color = color ? color : color ? color : "#000", size= size? size : 18}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
    >
      <Path
        d="M24 2A15 15 0 0 0 9 17v11.7l-3.32 5A4.08 4.08 0 0 0 9.07 40H18a6 6 0 0 0 12 0h8.93a4.08 4.08 0 0 0 3.39-6.33L39 28.7V17A15 15 0 0 0 24 2zm0 42a4 4 0 0 1-4-4h8a4 4 0 0 1-4 4zm16.65-9.22a2 2 0 0 1 .35 1.15A2.07 2.07 0 0 1 38.93 38H9.07A2.07 2.07 0 0 1 7 35.93a2 2 0 0 1 .35-1.15l3.48-5.23A1 1 0 0 0 11 29V17a13 13 0 0 1 26 0v12a1 1 0 0 0 .17.55z"
        fill={color}
         stroke={color}
      strokeWidth={1.2}
      />
    </Svg>
  );
}
