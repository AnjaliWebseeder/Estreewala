import { StyleSheet } from "react-native";
import { windowHeight } from "../../../../theme/appConstant";
import appColors from "../../../../theme/appColors";
import fonts from "../../../../theme/appFonts";

export const styles = StyleSheet.create({
 wrap: {
  flexDirection: "row",
  alignItems: "center",
  borderBottomWidth: 1,
  borderBottomColor: appColors.border,   // use specific property instead of borderColor
  backgroundColor: appColors.card,
  marginBottom: windowHeight(12),
  paddingBottom: windowHeight(12),
  paddingTop: 10,
  borderWidth:1,
  borderColor:appColors.border,
  marginHorizontal:15,
  borderRadius:10
},

  img: {
    width: 56, // slightly smaller
    height: 56,
    borderRadius: 8,
    marginRight: windowHeight(12), // reduced gap between image and text
    resizeMode: "contain",
    marginLeft:15
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
    borderColor: appColors.border,
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
    paddingVertical: windowHeight(2),
    flexDirection: "row",
    alignItems: "center",
    right:windowHeight(10)
  },
  qty: {
    color: "#fff",
    marginHorizontal: 8,
    fontWeight: "700",
    minWidth: 18,
    textAlign: "center",
  },
});
