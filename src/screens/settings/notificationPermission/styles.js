const { StyleSheet, Dimensions } = require("react-native");
import appColors from '../../../theme/appColors';
import { windowHeight, windowWidth } from '../../../theme/appConstant';
import fonts from '../../../theme/appFonts';

const {height} = Dimensions.get('window')

const BUTTON_HEIGHT = 52;

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  container: {
    flex: 1,
  },
  title: {
    marginTop: windowHeight(30),
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 26,
    color: '#333',
    fontFamily:fonts.InterMedium
  },
  illustrationWrap: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: "100%",
    height: height * 0.45,
  },
  footer: {
    width: '100%',
    paddingBottom: 24,
  },
  primaryBtn: {
    height: BUTTON_HEIGHT,
    borderRadius: 10,
    backgroundColor: appColors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginHorizontal:windowWidth(20)
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily:fonts.InterRegular
  },
  ghostBtn: {
    height: BUTTON_HEIGHT,
    borderRadius: 10,
    borderWidth: 1,
    borderColor:appColors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal:windowWidth(20)
  },
  ghostBtnText: {
    color: '#777',
    fontSize: 16,
  fontFamily:fonts.InterMedium
  },
});