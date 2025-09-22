import React from "react";
import Svg, { Path } from "react-native-svg";
import { View, Platform } from "react-native";
import appColors from "../../theme/appColors";

export const TabBackground = ({ height }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height,
        // Shadow for iOS
        shadowColor: "#000000ff",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        // shadowRadius: 4,
        // Elevation for Android
        //   elevation:10,
        // backgroundColor: appColors.lightBorder, // important

      }}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
      >
        <Path
          d="M0 0 Q200 60 400 0 V80 H0 Z"
          fill={appColors.white}
        
        />
      </Svg>
    </View>
  );
};
