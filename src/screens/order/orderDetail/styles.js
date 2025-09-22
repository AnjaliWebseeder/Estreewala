import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import { fontSizes, windowHeight } from "../../../theme/appConstant";
import fonts from "../../../theme/appFonts";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appColors.background },
contentContainerStyle:{
    paddingBottom:windowHeight(20)
},
  // Timeline
   timeline: {
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: appColors.background,
    paddingVertical:windowHeight(2)
  },
  imageView:{
    height:35,width:35,borderRadius:5,alignItems:"center",justifyContent:"center"
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    
  },
  iconColumn: {
    width: 50,
    alignItems: "center",
    marginRight:windowHeight(3),
    marginTop:windowHeight(4)
  },
  stepText: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 10,
  },
  stepTitle: {
    fontFamily:fonts.InterSemiBold,
    fontSize: 14,
    color:appColors.font,
   
  },
  stepDate: {
    fontSize: 12,
    fontFamily:fonts.InterRegular,
    color:appColors.subTitle
  },
  rightColumn: {
      alignItems: "center",
  justifyContent: "flex-start",
  },
  dottedLine: {
 width: 1,
  flexGrow: 1,         // take remaining space
  borderStyle: "dashed",
  borderLeftWidth: 1,
  borderColor: "#bab1b1ff",
  marginTop: -4,
  },

  // Customer
  card: { backgroundColor: appColors.card, paddingTop: 10,paddingHorizontal:15,paddingBottom:10, marginVertical: 10,elevation: 1,  borderColor:appColors.border,
    borderWidth:1,
    marginHorizontal:15,
     borderRadius: 10,},
  driverRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  horizontalLine: {
  borderBottomColor:appColors.border,
  borderBottomWidth: 1,
  borderStyle: "dashed",
  width: "100%",   // full width, or set fixed px
  marginBottom: 8,
},

  driverName: {fontFamily:fonts.InterMedium, fontSize: fontSizes.FONT16 , color:appColors.font  },
  driverCar: { fontSize: fontSizes.FONT14, color: appColors.subTitle,fontFamily:fonts.InterRegular , marginVertical:2 },
  driverPhone: { fontSize: 13, color: appColors.blue, marginTop: 2 , fontFamily:fonts.InterRegular },
  addressBlock: { flexDirection: "row", alignItems: "center", marginTop: 5,marginBottom:3 },
  addressText: { marginLeft: 8, color: appColors.subTitle,fontFamily:fonts.InterRegular , fontSize:fontSizes.FONT16 },

  // Items ,
  sectionTitle: {fontFamily:fonts.InterSemiBold, marginBottom: 5,fontSize:fontSizes.FONT19 , color:appColors.font },
  itemRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 ,marginTop:10},
  itemImage: { width: 35, height: 35, marginRight: 10 },
  itemName: { fontFamily:fonts.InterMedium , color:appColors.font,fontSize:fontSizes.FONT18 },
  itemService: { fontSize: 11, color: appColors.subTitle,fontFamily:fonts.InterRegular },
  itemPrice: {fontFamily:fonts.InterSemiBold , fontSize:fontSizes.FONT18 , color:appColors.font},
  instruction: { fontStyle: "italic", color: appColors.subTitle,fontFamily:fonts.InterRegular, marginTop: 2 ,fontSize:fontSizes.FONT14 },

  // Invoice
  invoiceId: {fontFamily:fonts.InterMedium, fontSize: 16 , color:appColors.font},
  invoiceStatus: { color: appColors.font, fontFamily:fonts.InterSemiBold, marginBottom: 10 , fontSize:fontSizes.FONT16},
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 4 },
  totalText: {fontFamily:fonts.InterMedium, color: appColors.font,fontFamily:fonts.InterBold,fontSize:fontSizes.FONT19  },
  invoiceButton: { marginTop:5,margin: 15, borderColor: appColors.blue, borderWidth:0.8 ,  padding: 12, borderRadius: 8,marginBottom:3 , flexDirection:"row",alignItems:"center",justifyContent:"center",height:windowHeight(40),width:"90%" },
  invoiceBtnText: { color: appColors.blue, textAlign: "center",fontFamily:fonts.InterMedium , fontSize:fontSizes.FONT18 },
  text:{
    color:appColors.subTitle,
    fontFamily:fonts.InterMedium,
    fontSize:fontSizes.FONT16

  },
  subTitle:{
 color:appColors.font,
    fontFamily:fonts.InterSemiBold,
    fontSize:fontSizes.FONT16
  },
  // Cancel Button
  cancelButton: { margin: 10, backgroundColor: appColors.font, padding: 12, borderRadius: 8 },
  cancelBtnText: { color: appColors.white, textAlign: "center",fontFamily:fonts.InterMedium,fontSize:fontSizes.FONT18 },


  summeryStyle:{
    backgroundColor:appColors.menuCard,
    marginHorizontal:10,
    borderRadius:6,
    marginVertical:15
  }
});
