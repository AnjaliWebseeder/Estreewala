import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const DocumentIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox="0 0 100 100"
    {...props}
  >
    <Defs>
      <LinearGradient id="a" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#97e0ff" />
        <Stop offset="1" stopColor="#1075ff" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1="23.709"
        y1="-26.532"
        x2="115.726"
        y2="74.308"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0" stopColor="#97e0ff" />
        <Stop offset="1" stopColor="#1075ff" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1="1.436"
        y1="-6.208"
        x2="93.453"
        y2="94.632"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0" stopColor="#97e0ff" />
        <Stop offset="1" stopColor="#1075ff" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1="-10.715"
        y1="4.88"
        x2="81.302"
        y2="105.72"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0" stopColor="#97e0ff" />
        <Stop offset="1" stopColor="#1075ff" />
      </LinearGradient>
    </Defs>
    <Path
      d="M58.43 6.493v8.756c0 1.944.772 3.807 2.147 5.179a7.317 7.317 0 0 0 5.18 2.146h8.756z"
      fill="url(#b)"
    />
    <Path
      d="M75.524 53.007c12.128 0 21.976 9.848 21.976 21.977S87.652 96.96 75.524 96.96s-21.977-9.848-21.977-21.976 9.848-21.977 21.977-21.977zM63.436 76.71l6.908 6.908a2.444 2.444 0 0 0 3.453 0l13.814-13.813c.952-.955.952-2.5 0-3.456a2.444 2.444 0 0 0-3.453 0L72.07 78.437l-5.182-5.18a2.444 2.444 0 0 0-3.453 0 2.444 2.444 0 0 0 0 3.453z"
      fill="url(#c)"
    />
    <Path
      d="M77.96 29.899v15.866c0 1.324-1.09 2.358-2.415 2.357h-.025c-14.822 0-26.859 12.036-26.859 26.859 0 6.93 2.63 13.256 6.947 18.023 1.38 1.525.33 3.956-1.727 3.956H9.831A7.33 7.33 0 0 1 2.5 89.63V10.37c0-1.943.767-3.81 2.148-5.182A7.293 7.293 0 0 1 9.83 3.04h41.271a2.458 2.458 0 0 1 2.45 2.45v9.654c0 1.383.187 2.77.647 4.073 1.817 5.144 6.534 8.242 11.563 8.242h9.76c.647 0 1.273.26 1.727.713.464.453.712 1.08.712 1.727z"
      fill="url(#d)"
    />
  </Svg>
);

export default DocumentIcon;
