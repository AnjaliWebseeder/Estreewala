import { StyleSheet } from "react-native";
import { windowHeight } from "../../../../theme/appConstant";
import appColors from "../../../../theme/appColors";
import fonts from "../../../../theme/appFonts";

export const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#F2F4F7",
    backgroundColor: "#fff",
    marginBottom: windowHeight(8), // reduced vertical space
    paddingBottom:windowHeight(12)
  },
  img: {
    width: 56, // slightly smaller
    height: 56,
    borderRadius: 8,
    marginRight: windowHeight(12), // reduced gap between image and text
    resizeMode: "contain",
  },
  info: { flex: 1 },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: appColors.font,
    fontFamily: fonts.InterMedium,
    marginBottom: 4, // tighter spacing
  },
  price: {
    fontSize: 13,
    color: "#7B7F86",
    fontFamily: fonts.InterRegular,
    flexDirection: "row",
    alignItems: "center",
    right:windowHeight(5)
  
  },
  right: {
    width: 88,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    borderWidth: 1,
    borderColor: appColors.blue,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: windowHeight(2),
    backgroundColor: "#fff",
  },
  addText: {
    color: appColors.blue,
    fontFamily: fonts.InterRegular,
    paddingTop: 1,
  },
  counter: {
    backgroundColor: appColors.blue,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  qty: {
    color: "#fff",
    marginHorizontal: 8,
    fontWeight: "700",
    minWidth: 18,
    textAlign: "center",
  },
});
