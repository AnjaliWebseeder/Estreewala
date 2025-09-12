import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import { fontSizes } from "../../../theme/appConstant";
import fonts from "../../../theme/appFonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  mapLoadingText: {
    marginTop: 10,
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.InterRegular,
    color: appColors.subTitle,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    backgroundColor: appColors.white,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openMapsButton: {
    position: 'absolute',
    bottom: 210,
    right: 20,
    backgroundColor: appColors.white,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: appColors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  addressSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  addressIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressLabel: {
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.InterMedium,
    color: appColors.subTitle,
    marginBottom: 4,
  },
  addressText: {
    fontSize: fontSizes.FONT16,
    fontFamily: fonts.InterRegular,
    color: appColors.font,
    lineHeight: 22,
  },
  loadingIndicator: {
    marginVertical: 8,
  },
  confirmButton: {
    backgroundColor: appColors.blue,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 15,
  },
  confirmText: {
    color: appColors.white,
    fontSize: fontSizes.FONT16,
    fontFamily: fonts.InterSemiBold,
  },
  disabled: {
    opacity: 0.6,
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  mapOverlayText: {
    marginTop: 10,
    fontSize: fontSizes.FONT16,
    fontFamily: fonts.InterMedium,
    color: appColors.font,
  },
});