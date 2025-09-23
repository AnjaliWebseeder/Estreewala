import { StyleSheet } from "react-native";
import fonts from "../../theme/appFonts";
import { fontSizes, windowHeight } from "../../theme/appConstant";
import appColors from "../../theme/appColors";

export const modalStyles = StyleSheet.create({
  modalContainer: { 
    flex: 1, 
    justifyContent: 'flex-end', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  modalContent: { 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    padding: 20, 
    maxHeight: '90%' 
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  modalTitle: { 
    fontSize: fontSizes.FONT20,  
    color: '#333',
    fontFamily:fonts.InterMedium
  },

  sectionTitle: { 
    fontSize: 16, 
    color: '#333', 
    marginBottom: 12,
    fontFamily:fonts.InterRegular
  },
 
  dateButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: appColors.menuCard, 
    paddingHorizontal: 12, 
    borderRadius: windowHeight(4), 
    borderWidth: 1, 
    borderColor:appColors.darkBlue ,
    paddingVertical:windowHeight(8),
    marginBottom:windowHeight(10)
  },
  dateButtonText:{
    marginHorizontal:windowHeight(10),
    color:appColors.font,
    fontFamily:fonts.InterRegular,
    marginTop:windowHeight(2)
  },
  slotsSection: { 
    marginBottom: windowHeight(10) 
  },
  dateSection:{
    marginBottom:windowHeight(5)
  },
  slotsGrid: { 
    justifyContent: 'space-between' 
  },
  timeSlot: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor:appColors.menuCard, 
    paddingHorizontal: 10, 
    borderRadius: 12, 
    marginBottom: windowHeight(10),
    marginRight:windowHeight(10), 
    borderWidth: 1, 
    borderColor: '#e9ecef', 
    minWidth: '48%' ,
    paddingVertical:windowHeight(8)
  },
  timeSlotSelected: { 
    backgroundColor:appColors.lightCream, 
    borderColor: appColors.blue ,
    borderWidth:0.8
  },
  timeSlotText: { 
    fontSize: 14, 
    color: '#666', 
    fontFamily:fonts.InterRegular
  },
  timeSlotTextSelected: { 
    color: appColors.blue, 
    fontWeight: '600' 
  },
  confirmButton: { 
    backgroundColor: appColors.blue, 
    paddingHorizontal: 16, 
    borderRadius: 12, 
    alignItems: 'center' ,
    paddingVertical:windowHeight(8)
  },
  confirmButtonDisabled: { 
    backgroundColor:appColors.inActive 
  },
  confirmButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontFamily:fonts.InterMedium
  },
  addressItem: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    paddingVertical: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#e9ecef' 
  },
  addressItemSelected: { 
    backgroundColor: '#f8f9fa', 
    borderRadius: 12 
  },
  radio: { 
    height: 22, 
    width: 22, 
    borderRadius: 11, 
    borderWidth: 2, 
    borderColor: appColors.blue, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 15, 
    marginTop: 4 
  },
  radioSelected: { 
    height: 12, 
    width: 12, 
    borderRadius: 6, 
    backgroundColor: appColors.blue 
  },
  addressDetails: { 
    flex: 1 
  },
  addressNameRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 4 
  },
  addressName: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333', 
    marginRight: 8 
  },
  defaultBadge: { 
    backgroundColor: '#e6f2ff', 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 4 
  },
  defaultBadgeText: { 
    fontSize: 10, 
    color: appColors.blue, 
    fontWeight: '500' 
  },
  addressText: { 
    fontSize: 14, 
    color: '#666' 
  },
  addAddressButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 16, 
    justifyContent: 'center' 
  },
  addAddressText: { 
    fontSize: 14, 
    color: appColors.blue, 
    fontFamily:fonts.InterRegular,
    marginLeft: 8 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#e9ecef', 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    marginBottom: 16, 
    fontSize: 16 ,
  },
  applyButton: { 
    backgroundColor: appColors.blue, 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 16 
  },
  applyButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  couponList: { 
    marginTop: 0
  },
  couponItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 12, 
    backgroundColor: '#f8f9fa', 
    borderRadius: 8, 
    marginBottom: 15
  },
  couponInfo: { 
    flex: 1 
  },
  couponCode: { 
    fontSize: 14, 
   fontFamily:fonts.InterMedium,
    color: '#333' 
  },
  couponDesc: { 
    fontSize: 12, 
    color: '#666' ,
    fontFamily:fonts.InterRegular,
  },
  applyText: { 
    color: appColors.blue, 
  fontFamily:fonts.InterMedium,
  fontSize:fontSizes.FONT16
  },
  paymentItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0' 
  },
  paymentText: { 
    flex: 1, 
    marginLeft: 12, 
    fontSize: 16, 
    color: '#333' ,
    fontFamily:fonts.InterRegular
  },

  paymentTextSelected: { 
    color: appColors.blue, 
   fontFamily:fonts.InterMedium
  },
    iconStyle:{
    height:windowHeight(15),
    width:windowHeight(20),
    resizeMode:"contain"
  },
  payButton: { 
    backgroundColor: appColors.blue, 
    paddingHorizontal: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 16,
    paddingVertical:10
  },
  payButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontFamily:fonts.InterMedium
  }
});
