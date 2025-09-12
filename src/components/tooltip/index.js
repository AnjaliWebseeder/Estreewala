import React, { useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet, Animated, View } from "react-native";
import { fontSizes, windowHeight } from "../../theme/appConstant";
import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";

export const CustomTooltip = ({ visible, message, onClose, duration = 2000 }) => {
  useEffect(() => {
    let timer;
    if (visible) {
      timer = setTimeout(() => {
        onClose?.(); // auto-close after duration
      }, duration);
    }
    return () => clearTimeout(timer); // cleanup
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={styles.tooltip}>
        <Text style={styles.tooltipText}>{message}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: "absolute",
    bottom: windowHeight(70),
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 250,
  },
  tooltipText: {
    color: appColors.white,
    flex: 1,
    fontFamily: fonts.InterRegular,
    fontSize: fontSizes.FONT16,
    textAlign: "center",
  },
  closeText: {
    color: appColors.white,
    marginLeft: 8,
    fontSize: fontSizes.FONT13,
  },
});
