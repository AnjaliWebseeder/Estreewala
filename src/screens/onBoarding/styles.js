import { Dimensions, StyleSheet } from "react-native";
import { fontSizes, windowHeight, windowWidth } from '../../theme/appConstant'
import fonts from '../../theme/appFonts'
import appColors from "../../theme/appColors";
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.05,
    marginBottom: height * 0.35,
  },
  image: {
    width: windowWidth(470),
    height: windowHeight(300),
  },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingVertical: 32,
    paddingHorizontal: 14,
    alignItems: "center",
    height: height * 0.38,
    shadowColor: appColors.blue,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  main:{
  flex:1,
  },
  title: {
    fontSize: fontSizes.FONT25,
    color: appColors.font,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 32,
    fontFamily:fonts.InterMedium
  },
  description: {
    fontSize: fontSizes.FONT16,
    color: appColors.subTitle,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 28,
    fontFamily:fonts.InterRegular
  },
  pagination: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal:4
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D6D6D6",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor:appColors.blue,
    height: 8,
  },
  nextBtn: {
    backgroundColor: appColors.blue,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: appColors.blue,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextText: {
    color:appColors.white,
    fontSize: fontSizes.FONT16,
    textAlign: "center",
    fontFamily:fonts.InterMedium
  },
  skipBtn: {
    position: "absolute",
    top: '7%',
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    fontSize: fontSizes.FONT19,
    color: appColors.font,
    fontFamily:fonts.InterRegular
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
  },
});