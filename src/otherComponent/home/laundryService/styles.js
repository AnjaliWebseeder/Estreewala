import { StyleSheet } from "react-native";
import fonts from "../../../theme/appFonts";
import { fontSizes, windowHeight } from "../../../theme/appConstant";
import appColors from "../../../theme/appColors";
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appColors.background },
  header: { paddingHorizontal: 18,paddingTop:windowHeight(6) ,},
  title: { fontSize: fontSizes.FONT22, color: appColors.white , fontFamily:fonts.InterSemiBold,textAlign:"left",paddingTop:2},
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
borderColor: appColors.border,
marginVertical: 3,
marginTop:windowHeight(10)
},
  meta: { paddingVertical: 12, color:appColors.white,fontFamily:fonts.InterSemiBold,fontSize:fontSizes.FONT16 },
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
  // Add these to your styles.js file
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
dropdownContainer: {
  position: 'absolute',
  backgroundColor: 'white',
  borderRadius: 8,
  paddingVertical: 0,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  minWidth: 150,
  zIndex: 1000,
},
dropdownItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 12,
},
dropdownItemSelected: {
  backgroundColor: appColors.lightPrimary, // Use your light primary color
},
dropdownItemText: {
  fontSize: 14,
  fontFamily: fonts.InterRegular,
  color: appColors.textPrimary,
},
dropdownItemTextSelected: {
  color: appColors.primary,
  fontFamily: fonts.InterSemiBold,
},
dropdownDivider: {
  height: 1,
  backgroundColor: appColors.lightGray,
  marginHorizontal: 8,
},
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
emptyContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 50,
},
emptyText: {
  fontSize: 16,
  color: appColors.gray,
  fontFamily: fonts.InterRegular,
},

filterButton: {
  position: 'absolute',
  top: windowHeight(10),
  right: windowHeight(10),
  zIndex: 10,
  width: windowHeight(30),
  height: windowHeight(30),
  borderRadius: windowHeight(6),
  backgroundColor: appColors.white,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 4,
},
selectedCategoryContainer: {
  paddingHorizontal: 5,
  marginBottom: 12,
},
selectedCategoryText: {
  fontSize: 14,
  fontFamily: fonts.InterMedium,
  color: appColors.textSecondary,
},

});
