import { StyleSheet } from 'react-native';
import { windowHeight } from '../../../theme/appConstant';
import { fontSizes } from '../../../theme/appConstant';
import fonts from '../../../theme/appFonts'
import appColors from '../../../theme/appColors';

export const styles = StyleSheet.create({
  itemCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingBottom: 5, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0',
    paddingTop: 7,
    paddingLeft:10
  },
  itemImage: { width: 45, height: 45, borderRadius: 8, marginRight: 12 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: fontSizes.FONT17, fontFamily: fonts.PoppinsMedium, color: appColors.font, marginBottom: 0 },
  itemPrice: { fontSize: fontSizes.FONT18, color: appColors.blue, fontFamily: fonts.PoppinsMedium },
  quantityContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: appColors.font, 
    borderRadius: 20, 
    padding: 4 
  },
  quantityButton: { 
    width: 20, 
    height: 20, 
    borderRadius: 14, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  quantityText: { 
    color: '#fff', 
    marginHorizontal: 8, 
    minWidth: 20, 
    textAlign: 'center',
    fontFamily: fonts.PoppinsRegular
  },
  removeItemButton: {
    padding: 8,
  },
  serviceTag: {
    marginBottom: windowHeight(0),
    borderRadius: 4,
  },
  serviceTagText: {
    color: "#958f8fff",
    fontSize: 11,
    fontFamily: fonts.PoppinsRegular
  },
});