import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { fontSizes } from "../../../theme/appConstant";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  skipButton: {
    position: 'absolute',
    top: 25,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: appColors.font,
    fontFamily: fonts.PoppinsRegular,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,

  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: fontSizes.FONT25,
    fontFamily:fonts.PoppinsMedium,
    color:appColors.font,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: fontSizes.FONT17,
    fontFamily: 'Poppins-Regular',
    color: appColors.subTitle,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  locationButton: {
    flexDirection: 'row',
    backgroundColor:appColors.blue,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  locationIcon: {
    marginRight: 10,
 
  },
  locationButtonText: {
    color: appColors.white,
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
  },
  manualLocationButton: {
    flexDirection: 'row',
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: appColors.blue,
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  searchIcon: {
    marginRight: 10,
  },
  manualLocationButtonText: {
    color: appColors.blue,
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
  },
  blank:{
    marginBottom:20
  }
});