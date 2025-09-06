import React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import appColors from "../../../theme/appColors";

const FAQIcon = ({ color = appColors.black, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={1.5} />
    <Path
      d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path d="M12 17h.01" stroke={color} strokeWidth={1.5} />
  </Svg>
);

export default FAQIcon;
