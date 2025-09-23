import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { Dimensions, StyleSheet } from 'react-native';
import { fontSizes } from '../../../theme/appConstant';
const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
   
  },
  contentContainerStyle:{
    paddingBottom:1,
      paddingLeft: 16,
  },
  title: {
    fontSize: fontSizes.FONT22,
    fontFamily:fonts.InterSemiBold,
    marginBottom: 8,
   color:appColors.font,
    paddingHorizontal: 16,
  },
 card: {
  width: width * 0.75,
  padding: 16,
  marginRight: 14,
  borderRadius: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3.84,
  // elevation: 2,
},
  activeCard: {
    borderColor: '#10a1efff',
    shadowColor: '#dbb4f5ff',
    shadowOpacity: 0.2,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  offerImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontFamily:fonts.InterMedium,
    color: appColors.title,
    marginBottom: 2,
  },
  offerSub: {
    fontSize: fontSizes.FONT16,
    color:appColors.subTitle, 
    lineHeight: 18,
    fontFamily:fonts.InterRegular,
    lineHeight:20
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#07172cff",
    width: 12,
  },
  inactiveDot: {
    backgroundColor:appColors.border,
  },
});