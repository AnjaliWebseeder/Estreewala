import { StyleSheet } from "react-native";
import { windowHeight } from "../../../../theme/appConstant";
import appColors from "../../../../theme/appColors";
import fonts from "../../../../theme/appFonts";

export const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: "#F2F4F7",
    backgroundColor: "#fff",
    paddingBottom:windowHeight(16),
    paddingTop:windowHeight(10)
  },
  img: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: windowHeight(17),
    resizeMode: "contain",
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600", color: appColors.font,fontFamily:fonts.PoppinsMedium },
  price: { marginTop: 4, fontSize: 14, color: "#7B7F86",fontFamily:fonts.PoppinsRegular },
  right: { width: 92, alignItems: "center", justifyContent: "center" },
  addButton: {
    borderWidth: 1.5,
    borderColor: appColors.blue,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: windowHeight(2),
    backgroundColor: "#fff",
  },
  addText: { color: appColors.blue, fontFamily:fonts.PoppinsRegular,paddingTop:2},
  counter: {
    backgroundColor: appColors.blue,
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  qty: {
    color: "#fff",
    marginHorizontal: 10,
    fontWeight: "700",
    minWidth: 18,
    textAlign: "center",
  },
});