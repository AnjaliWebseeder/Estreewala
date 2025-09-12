import { StyleSheet } from "react-native";
import fonts from "../../../theme/appFonts";
import { fontSizes, windowHeight } from "../../../theme/appConstant";
import appColors from "../../../theme/appColors";
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appColors.white },
  header: { paddingHorizontal: 18,paddingTop:windowHeight(6) },
  title: { fontSize: fontSizes.FONT22, color: appColors.font , fontFamily:fonts.InterSemiBold},
  sub: { marginTop: windowHeight(0), color:appColors.lightFont,fontFamily: fonts.InterRegular,fontSize:fontSizes.FONT16},
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingBottom: 3,
  },
  categoryTitle:{
     fontSize: fontSizes.FONT20, color: appColors.font , fontFamily:fonts.InterMedium

  },
  dashedLine: {
borderBottomWidth: 1,
borderStyle: "dashed",
borderColor: "#ccc",
marginVertical: 3,
marginTop:windowHeight(10)
},
  meta: { paddingVertical: 12, color:appColors.subTitle,fontFamily:fonts.InterSemiBold,fontSize:fontSizes.FONT16 },
  cartBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 14,
    backgroundColor: appColors.font,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 10,
  },
  cartTitle: { color:appColors.white, fontFamily:fonts.InterMedium, fontSize: 15 },
  cartSub: { color: "#EDEFFF", fontSize: 12, marginTop: 0,fontFamily:fonts.InterRegular },
  cartBtn: {
    backgroundColor:appColors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  cartBtnText: { color: appColors.font, fontFamily:fonts.InterMedium },
});
