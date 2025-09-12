import { StyleSheet } from "react-native";
import { fontSizes, windowHeight } from "../../../theme/appConstant";
import fonts from "../../../theme/appFonts";
import appColors from "../../../theme/appColors";

export const addressStyles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    paddingHorizontal: windowHeight(1),
  },
  titleStyle:{
     fontFamily:fonts.InterRegular,
     color:appColors.blue,
     fontSize:fontSizes.FONT16,

  },
  textContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: fontSizes.FONT16HALF,
    color: '#666',
    lineHeight: 20,
    marginHorizontal:windowHeight(30),
    fontFamily:fonts.InterRegular
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#666',
    marginHorizontal:windowHeight(14),
    fontFamily:fonts.InterRegular
  },
  editButton: {
    paddingHorizontal: 8,
  },
});