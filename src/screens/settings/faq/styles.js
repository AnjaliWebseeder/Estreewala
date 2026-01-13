import { StyleSheet } from 'react-native';
import { fontSizes, windowHeight, windowWidth } from '../../../theme/appConstant';
import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },

  content: {
    paddingHorizontal: windowWidth(18),
    paddingBottom: windowHeight(25),
    paddingTop: windowHeight(5),
  },

  faqContainer: {
    marginBottom: windowHeight(10),
  },

  faqItem: {
    marginBottom: windowHeight(12),
    borderRadius: windowWidth(8),
    overflow: 'hidden',
    backgroundColor: appColors.menuCard,
    elevation: 2,
    shadowOffset: { width: 0, height: windowHeight(1) },
    shadowOpacity: 0.1,
    shadowRadius: windowWidth(3),
  },

  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: windowHeight(8),
  },

  faqQuestionText: {
    flex: 1,
    fontSize: fontSizes.FONT17,
    color: appColors.font,
    fontFamily: fonts.InterMedium,
    marginRight: windowWidth(12),
    lineHeight: windowHeight(21),
  },

  faqAnswer: {
    paddingHorizontal: windowWidth(13),
    paddingTop: windowHeight(7),
    paddingBottom: windowHeight(12),

    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderTopColor: appColors.darkBlue,
    marginHorizontal: windowWidth(10),
  },

  faqAnswerText: {
    fontSize: fontSizes.FONT15,
    lineHeight: windowHeight(22),
    color: appColors.font,
    fontFamily: fonts.InterRegular,
  },

  helpSection: {
    backgroundColor: appColors.menuCard,
    borderRadius: windowWidth(12),
    padding: windowHeight(24),
    alignItems: 'center',
    marginTop: windowHeight(10),
  },

  helpTitle: {
    fontSize: fontSizes.FONT17,
    color: appColors.font,
    marginBottom: windowHeight(8),
    fontFamily: fonts.InterMedium,
  },

  helpText: {
    fontSize: fontSizes.FONT15,
    color: appColors.font,
    marginBottom: windowHeight(16),
    fontFamily: fonts.InterRegular,
    textAlign: 'center',
    lineHeight: windowHeight(22),
  },

  helpButton: {
    backgroundColor: appColors.font,
    borderRadius: windowWidth(24),
    paddingHorizontal: windowWidth(32),
    paddingVertical: windowHeight(10),
  },

  helpButtonText: {
    fontSize: fontSizes.FONT14,
    color: appColors.white,
    fontFamily: fonts.InterMedium,
  },
});
