import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth, fontSizes } from '../../../theme/appConstant';
import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  content: {
    paddingHorizontal: windowWidth(20),
  },
  helpTitle: {
    fontSize: fontSizes.FONT21,
    fontFamily: fonts.InterSemiBold,
    color: appColors.font,
    marginBottom: windowHeight(5),
  },
  helpSubText: {
    fontSize: fontSizes.FONT18,
    fontFamily: fonts.InterRegular,
    color: appColors.font,
    marginBottom: windowHeight(23),
    lineHeight: windowHeight(15),
  },
  cardBox: {
    backgroundColor: appColors.menuCard,
    borderRadius: windowWidth(12),
    padding: windowWidth(14),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: windowWidth(6),
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: windowHeight(16),
    borderColor: appColors.darkBlue,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: windowHeight(4),
  },
  cardTitle: {
    fontSize: fontSizes.FONT17,
    fontFamily: fonts.InterRegular,
    color: appColors.font,
    marginLeft: windowWidth(8),
  },
  cardValue: {
    fontSize: fontSizes.FONT20,
    fontFamily: fonts.InterRegular,
    color: appColors.blue,
    marginLeft: windowWidth(28),
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: windowHeight(8),
  },
  messageLabel: {
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.InterRegular,
    marginLeft: windowWidth(6),
    color: '#000',
  },
  textInput: {
    borderColor: appColors.darkBlue,
    borderWidth: 1,
    borderRadius: windowWidth(10),
    backgroundColor: appColors.menuCard,
    padding: windowWidth(12),
    fontFamily: fonts.InterRegular,
    fontSize: fontSizes.FONT14,
    minHeight: windowHeight(100),
    color: appColors.black,
  },
  charCount: {
    textAlign: 'right',
    fontSize: fontSizes.FONT12,
    color: appColors.font,
    marginTop: windowHeight(4),
    fontFamily: fonts.InterRegular,
  },
  submitBtn: {
    backgroundColor: appColors.blue,
    paddingVertical: windowHeight(10),
    borderRadius: windowWidth(10),
    marginTop: windowHeight(20),
    alignItems: 'center',
    marginHorizontal: windowWidth(20),
    marginBottom: windowHeight(20),
  },
  submitText: {
    color: appColors.white,
    fontFamily: fonts.InterMedium,
    fontSize: fontSizes.FONT16,
  },
  disabledBtn: {
    backgroundColor: '#cccccc',
  },
});
