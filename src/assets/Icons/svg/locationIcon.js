import React from "react";
import Svg, { Path } from "react-native-svg";
import appColors from "../../../theme/appColors";

export function LocationIcon({ color = appColors.blue, size = 18 }) {
  return (
     <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21s8-7 8-12a8 8 0 1 0-16 0c0 5 8 12 8 12z"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      stroke={color}
      strokeWidth="2"
    />
  </Svg>
  );
}
