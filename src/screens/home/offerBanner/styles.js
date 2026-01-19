import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { StyleSheet } from 'react-native';
import { fontSizes, windowWidth, windowHeight } from '../../../theme/appConstant';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: windowHeight(18),
  },

  contentContainerStyle: {
    paddingBottom: windowHeight(1),
    paddingLeft: windowWidth(16),
  },

  title: {
    fontSize: fontSizes.FONT22,
    fontFamily: fonts.InterSemiBold,
    marginBottom: windowHeight(8),
    color: appColors.font,
    paddingHorizontal: windowWidth(16),
  },

  card: {
    width: windowWidth(330),
    padding: windowWidth(16),
    marginRight: windowWidth(14),
    borderRadius: windowWidth(16),
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
    width: windowWidth(60),
    height: windowWidth(60),
    resizeMode: "contain",
    marginRight: windowWidth(12),
  },

  textContainer: {
    flex: 1,
  },

  offerTitle: {
    fontSize: windowWidth(16),
    fontFamily: fonts.InterMedium,
    color: appColors.title,
    marginBottom: windowHeight(2),
  },

  offerSub: {
    fontSize: fontSizes.FONT16,
    color: appColors.subTitle,
    fontFamily: fonts.InterRegular,
    lineHeight: windowHeight(20),
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: windowHeight(8),
  },

  dot: {
    width: windowWidth(8),
    height: windowWidth(8),
    borderRadius: windowWidth(4),
    marginHorizontal: windowWidth(4),
  },

  activeDot: {
    backgroundColor: "#07172cff",
    width: windowWidth(12),
  },

  inactiveDot: {
    backgroundColor: appColors.border,
  },
});
