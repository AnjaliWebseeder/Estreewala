const { StyleSheet,Platform } = require("react-native");
import appColors from "../../theme/appColors";
import { fontSizes, windowHeight, windowWidth } from "../../theme/appConstant";
import fonts from "../../theme/appFonts";
export const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F6F9",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ECEFF6",
    width:windowWidth(140)
  },
  text: { flex: 1, fontSize: 13, color: appColors.font,fontFamily:fonts.PoppinsRegular },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  dropdown: {
    backgroundColor: appColors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ECEFF6",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    overflow: Platform.OS === "ios" ? "visible" : "hidden",
  },
  opt: { paddingVertical: 12, paddingHorizontal: 14 },
  optText: { fontSize: fontSizes.FONT15HALF, color: appColors.font,lineHeight:windowHeight(16)},
  sep: { height: 1, backgroundColor: "#F2F4F7" },
});