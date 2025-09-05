import React from "react";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import appColors from "../../../theme/appColors";

const PrivacyIcon = ({ color = appColors.blue, size = 21 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="16" r="1" stroke={color} strokeWidth={1.5} />
    <Rect
      x="3"
      y="10"
      width="18"
      height="12"
      rx="2"
      stroke={color}
      strokeWidth={1.5}
    />
    <Path
      d="M7 10V7a5 5 0 0 1 10 0v3"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

export default PrivacyIcon;
