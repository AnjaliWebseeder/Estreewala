import { StyleSheet } from 'react-native';
import fonts from '../../theme/appFonts';
import { fontSizes, windowHeight } from '../../theme/appConstant';
import appColors from '../../theme/appColors';
export const styles = StyleSheet.create({

   container: { flex: 1, backgroundColor: '#f8f9fa' },
  titleStyle:{
    marginHorizontal:20,
    fontFamily:fonts.PoppinsSemiBold
  },
   border:{
    width: "100%",
    height: 1,
    backgroundColor: appColors.border, 
    marginVertical: windowHeight(4),
  },
  contentContainerStyle:{
     paddingBottom:50
  },
  section: { 
    padding: 6, 
    borderRadius: 16,
  },
  sectionStyle:{
    padding: 6, 
    borderRadius: 16, 
    paddingHorizontal:windowHeight(10),
    marginHorizontal:windowHeight(3)
  },
  row:{
    flexDirection:"row",
  },
  iconStyle:{
    marginRight:windowHeight(10),
    marginTop:windowHeight(3)
  },
  sectionTitle: { fontSize: fontSizes.FONT21, color: appColors.font, fontFamily:fonts.PoppinsSemiBold},
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
  scheduleLabel: { fontSize: fontSizes.FONT18, color: appColors.font ,fontFamily:fonts.PoppinsSemiBold},
  rowStyle:{
    flexDirection:"row",alignItems:"center"
  },
  scheduleDate: { fontSize: fontSizes.FONT15, color: "#666", marginBottom: 2,fontFamily:fonts.PoppinsRegular },
  verticalLine:{
     width: 1, height: windowHeight(60), backgroundColor: "#ece4e4ff", marginHorizontal: 10,
     marginTop:windowHeight(12)
  },
  couponSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    marginHorizontal: 1, 
    marginBottom: 2, 
    borderRadius: 12,
    
  },
  couponIcon:{
   marginTop:10
  },
  couponText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#888' ,fontFamily:fonts.PoppinsMedium},
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  totalRow: { borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 12, marginTop: 8 },
  priceLabel: { fontSize: 14, color: appColors.font,fontFamily:fonts.PoppinsMedium},
  priceValue: { fontSize: 14, color: appColors.font,fontFamily:fonts.PoppinsMedium },
   ruppes:{
    marginTop:10
  },
  discountText: { color: '#4CAF50' },
  totalLabel: { fontSize: 16, fontFamily:fonts.PoppinsMedium, color: appColors.font },
  totalValue: { fontSize: 16, fontFamily:fonts.PoppinsMedium, color: appColors.blue },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    justifyContent:"center",
     paddingHorizontal: 16,
     paddingBottom:16 
   
  },
 
  payButton: { 
    backgroundColor: appColors.font, 
    paddingHorizontal: 20, 
    paddingVertical: windowHeight(12), 
    borderRadius: 10 ,
    width:"100%",
    alignItems:"center",
    justifyContent:"center"
  },
  payButtonText: { color: '#fff', fontWeight: '600', fontSize: fontSizes.FONT18HALF,fontFamily:fonts.PoppinsMedium },
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
   fontFamily:fonts.PoppinsRegular,
   fontSize:fontSizes.FONT13
  },
  serviceTag: {
     
     marginBottom:windowHeight(0),
    borderRadius: 4,
   
  },
  serviceTagText: {
    color: "#958f8fff",
    fontSize: 11,
     fontFamily:fonts.PoppinsRegular
  },
  orderNoteInput: {
    borderRadius: 8,
    paddingHorizontal: 2,
    textAlignVertical: 'top',
    fontFamily:fonts.PoppinsMedium,
    paddingTop:12,
    lineHeight:windowHeight(20)
  }
});