import React from "react";
import Svg, { Path } from "react-native-svg";
import appColors from "../../../theme/appColors";

export function CardIcon({ color = appColors.blue, size = 18 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      d="M28 6H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 6H4V8h24v4z"
      fill={color}
    />
  </Svg>
  );
}
