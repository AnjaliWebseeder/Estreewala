import { StyleSheet } from 'react-native';
import appColors from '../../../theme/appColors';
import fonts from '../../../theme/appFonts';
import { fontSizes, windowHeight } from '../../../theme/appConstant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white
  },
  
  orderNo: {
    fontSize: fontSizes.FONT18,
    fontFamily: fonts.PoppinsSemiBold,
    color: appColors.darkText,
    marginLeft: 10,
  },
  orderDate: {
    fontSize: fontSizes.FONT13,
    fontFamily: fonts.PoppinsRegular,
    color: appColors.subTitle,

  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: windowHeight(15),
    
    // marginBottom: 20,
  },
  progressCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: appColors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  statusLabel: {
    fontSize: fontSizes.FONT20,
    fontFamily: fonts.PoppinsRegular,
    color: "#666",
    marginBottom: 1,
  },
  statusValue: {
    fontSize: fontSizes.FONT18,
    fontFamily: fonts.PoppinsMedium,
    color: appColors.blue,
  },
    horizontalBorder:{
      width: "100%",       // full width
    height:windowHeight(2.3),           // thickness
    backgroundColor: appColors.lightBorder, // color,
    marginTop:windowHeight(18),
    marginBottom:windowHeight(3)
    // marginVertical: 10,  // spacing
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop:10
  },
  timeBox: {
    flex: 1,
    backgroundColor: '#F9F9F9', // soft light gray
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    paddingVertical:10,
    marginTop:windowHeight(4),
    // borderRadius:10
  },
  grayLabel: {
    fontSize: fontSizes.FONT14HALF,
    fontFamily: fonts.PoppinsRegular,
    color: "#666",
    marginBottom: 3,
  },
  timeTitle: {
    fontSize: fontSizes.FONT16,
    fontFamily: fonts.PoppinsSemiBold,
    color: appColors.darkText,
  },
  timeValue: {
    fontSize: fontSizes.FONT14HALF,
    fontFamily: fonts.PoppinsRegular,
    color: "#666",
  },
  addressBox: {
    backgroundColor: '#F9F9F9', // soft light gray
    borderRadius: 12,
    padding: 16,
    marginBottom: windowHeight(13),
  },
  addressValue: {
    fontSize: fontSizes.FONT15HALF,
    fontFamily: fonts.PoppinsMedium,
    color: appColors.darkText,
  },
  itemList: {
    marginBottom: 10,
    marginHorizontal:windowHeight(16)
  },
  itemHeader: {
    fontSize: fontSizes.FONT18,
    fontFamily: fonts.PoppinsMedium,
    color: "#666",
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemName: {
    fontSize: fontSizes.FONT16,
    fontFamily: fonts.PoppinsSemiBold,
    color: appColors.darkText,
    flex: 1,
  },
  itemService: {
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.PoppinsRegular,
    color: "#666",
    flex: 1,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: fontSizes.FONT17,
    fontFamily: fonts.PoppinsSemiBold,
    color: appColors.darkText,
  },
  totalBox: {
    borderTopWidth: 1,
    borderTopColor: appColors.lightBorder,
    paddingTop: 16,
    marginBottom: 20,
    marginHorizontal:16
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: fontSizes.FONT15,
    fontFamily: fonts.PoppinsRegular,
    color: "#666",
  },
  totalValue: {
    fontSize: fontSizes.FONT17,
    fontFamily: fonts.PoppinsSemiBold,
    color: appColors.darkText,
  },
  paymentMethod: {
    fontSize: fontSizes.FONT18,
    fontFamily: fonts.PoppinsMedium,
    color: appColors.blue,
  },
  totalFinal: {
    fontSize: fontSizes.FONT22,
    fontFamily: fonts.PoppinsMedium,
    color: appColors.blue,
  },
});
