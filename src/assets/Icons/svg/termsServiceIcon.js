import React from "react";
import Svg, { Path } from "react-native-svg";

const TermsServiceIcon = ({ color = "#4361EE", size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 
         2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Path d="M14 8H8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M16 12H8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M13 16H8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

export default TermsServiceIcon;
