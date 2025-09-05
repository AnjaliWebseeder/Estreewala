import { StyleSheet } from "react-native";
import { fontSizes } from '../../../theme/appConstant';
import { windowHeight } from '../../../theme/appConstant';
import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: windowHeight(50),
    paddingTop:4
  },
  faqContainer: {
    marginBottom: windowHeight(10),
    marginTop:windowHeight(16)
  },
  faqItem: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: appColors.white,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: fontSizes.FONT17,
    color:appColors.font,
    fontFamily:fonts.PoppinsMedium,
    marginRight: 12,
    lineHeight:windowHeight(21)
  },
  faqAnswer: {
    padding: 13,
    paddingTop: 7,
    borderTopWidth: 1,
    borderTopColor: appColors.border,
  },
  faqAnswerText: {
    fontSize: fontSizes.FONT15,
    lineHeight: 22,
    color:appColors.font,
    fontFamily:fonts.PoppinsRegular,
  },
  helpSection: {
    backgroundColor:'#EEF4F7',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 17,
    color:appColors.font,
    marginBottom: 8,
     fontFamily:fonts.PoppinsMedium,
  },
  helpText: {
    fontSize: 15,
    color:appColors.font,
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  helpButton: {
    backgroundColor: appColors.blue,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  helpButtonText: {
    fontSize: 14,
    color: appColors.white,
fontFamily:fonts.PoppinsMedium,
  },
});