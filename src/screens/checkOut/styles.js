import { StyleSheet } from 'react-native';
import fonts from '../../theme/appFonts';
import { fontSizes, windowHeight } from '../../theme/appConstant';
import appColors from '../../theme/appColors';
export const styles = StyleSheet.create({

   container: { flex: 1, backgroundColor: '#f8f9fa' },
  titleStyle:{
    marginHorizontal:20,
    fontFamily:fonts.InterSemiBold,
    color:appColors.white
  },
   border:{
    width: "100%",
    height: 1,
    marginTop:windowHeight(6)
  },
  contentContainerStyle:{
     paddingBottom:windowHeight(5)
  },
  section: { 
    padding: 6, 
    borderRadius: 16,
  },
  sectionStyle:{
    padding: 6, 
    borderRadius: 16, 
    paddingHorizontal:windowHeight(10),
    marginHorizontal:windowHeight(3),
    paddingBottom:10
  },
  row:{
    flexDirection:"row",
  },
  iconStyle:{
    marginRight:windowHeight(10),
    marginTop:windowHeight(3)
  },
  sectionTitle: { fontSize: fontSizes.FONT19, color: appColors.font, fontFamily:fonts.InterMedium},
  scheduleRow: { flexDirection: 'row', justifyContent: 'space-between' },
  horizontalBorder:{
      width: "100%",       // full width
    height:windowHeight(4),           // thickness
    backgroundColor: appColors.lightBorder // color
    // marginVertical: 10,  // spacing
  },
  scheduleCard: { 
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: '#f8f9fa', 
    paddingTop: windowHeight(10), 
    borderRadius: 12, 
    marginHorizontal: 4,
    paddingHorizontal:windowHeight(8) 
  },
  scheduleInfo: { marginLeft: 12, flex: 1 },
  scheduleLabel: { fontSize: fontSizes.FONT18, color: appColors.font ,fontFamily:fonts.InterSemiBold},
  rowStyle:{
    flexDirection:"row",alignItems:"center"
  },
  scheduleDate: { fontSize: fontSizes.FONT15, color: "#666", marginBottom: 2,fontFamily:fonts.InterRegular },
  verticalLine:{
     width: 1, height: windowHeight(60), backgroundColor: "#ece4e4ff", marginHorizontal: 10,
     marginTop:windowHeight(12)
  },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  totalRow: { borderTopWidth: 1, borderTopColor:appColors.darkBlue, paddingTop: 12, marginTop: 8 },
  priceLabel: { fontSize: 14, color: appColors.font,fontFamily:fonts.InterMedium},
  priceValue: { fontSize: 14, color: appColors.font,fontFamily:fonts.InterMedium },
   ruppes:{
    marginTop:10
  },
  discountText: { color: '#4CAF50' },
  totalLabel: { fontSize: 16, fontFamily:fonts.InterMedium, color: appColors.font },
  totalValue: { fontSize: 16, fontFamily:fonts.InterMedium, color: appColors.blue },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    justifyContent:"center",
     paddingHorizontal: 16,
     paddingBottom:6,
     marginVertical:windowHeight(0),
     paddingTop:windowHeight(40)
   
  },
 
  payButton: { 
    backgroundColor: appColors.darkBlue, 
    paddingHorizontal: 20, 
    paddingVertical: windowHeight(12), 
    borderRadius: 10 ,
    width:"100%",
    alignItems:"center",
    justifyContent:"center"
  },
  payButtonText: { color: '#fff', fontWeight: '600', fontSize: fontSizes.FONT18HALF,fontFamily:fonts.InterMedium },
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
  removeItemButton: {
    padding: 8,
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: windowHeight(11),
    paddingVertical:8,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  clearAllText: {
    color: appColors.error,
    marginLeft: 8,
   fontFamily:fonts.InterRegular,
   fontSize:fontSizes.FONT13
  },
  serviceTag: {
     
     marginBottom:windowHeight(0),
    borderRadius: 4,
   
  },
  serviceTagText: {
    color: "#958f8fff",
    fontSize: 11,
     fontFamily:fonts.InterRegular
  },
  orderNoteInput: {
    borderRadius: 8,
    paddingHorizontal: 2,
    textAlignVertical: 'top',
    fontFamily:fonts.InterMedium,
    paddingTop:12,
    lineHeight:windowHeight(20)
  },
  deliveryCard: {
  opacity: 0.9, // Slightly dim to indicate it's auto-calculated
},
deliveryNote: {
  fontSize: fontSizes.FONT12,
  color: appColors.subTitle,
  marginTop: 3,
  fontStyle: 'italic',
},
image:{
  height:windowHeight(22),
  width:windowHeight(22),
  resizeMode:"contain"
},
deliveryOptions: {
  marginBottom: 10,
},
deliveryOption: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 15,
  borderWidth: 1,
  borderColor: appColors.border,
  borderRadius: 8,
  // marginBottom: 10,
},
primaryOption: {
  borderColor: appColors.blue,
  backgroundColor: appColors.blue + '10',
  borderWidth:0.6,
  marginBottom:12
},
optionTextContainer: {
  flex: 1,
  marginLeft: 10,
},
optionTitle: {
  fontSize: fontSizes.FONT16,
  fontFamily: fonts.InterMedium,
  color: appColors.font,
},
optionSubtitle: {
  fontSize: fontSizes.FONT12,
  fontFamily: fonts.InterRegular,
  color: appColors.subTitle,
  marginTop: 2,
},
});