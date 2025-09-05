import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { StyleSheet } from 'react-native';
import { fontSizes, windowHeight } from '../../../theme/appConstant';

export const styles = StyleSheet.create({
  header: {
    marginTop: windowHeight(30),
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
 paddingHorizontal: 16,
  },
  iconStyle:{
   marginHorizontal:8
  },
  title: {
    flex: 1,
    fontSize: fontSizes.FONT24,
    marginTop:windowHeight(10),
    lineHeight:windowHeight(22),
    fontFamily:fonts.PoppinsMedium,
    color:appColors.font ,
     paddingHorizontal: 16,  
  
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
