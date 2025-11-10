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
  card: { backgroundColor: appColors.card, paddingTop: 10,paddingHorizontal:15,paddingBottom:10, marginVertical: 10,elevation: 1,  borderColor:appColors.darkBlue,
    borderWidth:1,
    marginHorizontal:15,
     borderRadius: 10,},
  driverRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  horizontalLine: {
  borderBottomColor:appColors.darkBlue,
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
  },
  scrollView: {
  flex: 1,
},
scrollContent: {
  padding: 16,
  paddingBottom: 20,
},
card: {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
orderHeader: {
  flexDirection: 'row',
  alignItems: 'center',
},
vendorImage: {
  width: 60,
  height: 60,
  borderRadius: 8,
  marginRight: 12,
},
orderHeaderInfo: {
  flex: 1,
},
vendorName: {
  fontSize: 18,
  fontWeight: 'bold',
  color: appColors.text,
  marginBottom: 4,
},
orderId: {
  fontSize: 14,
  color: appColors.textGray,
  marginBottom: 8,
},
statusBadge: {
  paddingHorizontal: 12,
  paddingVertical: 4,
  borderRadius: 12,
  alignSelf: 'flex-start',
},
statusText: {
  fontSize: 12,
  fontWeight: '600',
},
divider: {
  height: 1,
  backgroundColor: appColors.border,
  marginVertical: 16,
},
timelineSection: {
  marginTop: 8,
},
timelineItem: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: 16,
},
timelineContent: {
  marginLeft: 12,
  flex: 1,
},
timelineLabel: {
  fontSize: 14,
  color: appColors.textGray,
  marginBottom: 2,
},
timelineValue: {
  fontSize: 14,
  color: appColors.text,
  fontWeight: '500',
},

orderItemRight: {
  alignItems: 'flex-end',
},
itemName: {
  fontSize: 14,
  fontWeight: '500',
  color: appColors.text,
  marginBottom: 2,
},
serviceType: {
  fontSize: 12,
  color: appColors.textGray,
},
itemQuantity: {
  fontSize: 12,
  color: appColors.textGray,
},
instructionsSection: {
  marginTop: 12,
  padding: 12,
  backgroundColor: appColors.lightCream,
  borderRadius: 8,
},
instructionsLabel: {
  fontSize: 14,
  fontWeight: '500',
  color: appColors.text,
  marginBottom: 4,
},
instructionsText: {
  fontSize: 14,
  color: appColors.textGray,
},
addressSection: {
  flexDirection: 'row',
  alignItems: 'flex-start',
},
vendorSection: {
  flexDirection: 'row',
  alignItems: 'flex-start',
},
addressContent: {
  marginLeft: 12,
  flex: 1,
},
vendorContent: {
  marginLeft: 12,
  flex: 1,
},
addressName: {
  fontSize: 14,
  fontWeight: '500',
  color: appColors.text,
  marginBottom: 4,
},
addressLandmark: {
  fontSize: 13,
  color: appColors.textGray,
  fontStyle: 'italic',
  marginTop: 4,
},
addressPhone: {
  fontSize: 14,
  color: appColors.textGray,
  marginTop: 6,
  flexDirection: 'row',
  alignItems: 'center',
},
vendorPhone: {
  fontSize: 14,
  color: appColors.textGray,
  marginTop: 4,
  flexDirection: 'row',
  alignItems: 'center',
},
priceRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
},
priceLabel: {
  fontSize: 14,
  color: appColors.textGray,
},
priceValue: {
  fontSize: 14,
  color: appColors.textGray,
  marginLeft: 4,
},
totalLabel: {
  fontSize: 16,
  fontWeight: 'bold',
  color: appColors.text,
},
totalValue: {
  fontSize: 18,
  fontWeight: 'bold',
  color: appColors.blue,
  marginLeft: 4,
},
actionButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 8,
  marginBottom: 16,
},
primaryButton: {
  flex: 1,
  backgroundColor: appColors.blue,
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  marginLeft: 8,
  alignItems: 'center',
},
secondaryButton: {
  flex: 1,
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: appColors.blue,
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  marginRight: 8,
  alignItems: 'center',
},
primaryButtonText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: '600',
},
secondaryButtonText: {
  color: appColors.blue,
  fontSize: 14,
  fontWeight: '600',
},
bottomSpacing: {
  height: 20,
},
// Progress Steps Styles
progressContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 8,
},
progressStep: {
  alignItems: 'center',
  flex: 1,
},
progressIcon: {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: '#f0f0f0',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 4,
},
progressIconCompleted: {
  backgroundColor: appColors.blue,
},
progressIconCurrent: {
  backgroundColor: appColors.blue,
},
progressLabel: {
  fontSize: 10,
  color: appColors.textGray,
  textAlign: 'center',
  marginTop: 4,
},
progressLabelCompleted: {
  color: appColors.blue,
  fontWeight: '500',
},
progressLabelCurrent: {
  color: appColors.blue,
  fontWeight: 'bold',
},
progressLine: {
  position: 'absolute',
  top: 16,
  left: '60%',
  right: '-40%',
  height: 2,
  backgroundColor: '#f0f0f0',
  zIndex: -1,
},
progressLineCompleted: {
  backgroundColor: appColors.blue,
},
// Add these styles to your existing styles
cancelButtonDisabled: {
  backgroundColor: appColors.gray,
  opacity: 0.6,
},
cancelledMessage: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFEBEE',
  padding: 16,
  margin: 15,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#FFCDD2',
},
cancelledText: {
  color: '#D32F2F',
  fontSize: 16,
  fontWeight: '500',
  marginLeft: 8,
  fontFamily: fonts.InterMedium,
},
});
