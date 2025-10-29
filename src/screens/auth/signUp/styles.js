import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  contentContainer: {
    paddingTop: 0,
  },
  submitButton: {
    backgroundColor: appColors.blue,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor:appColors.inActive,
  },
  submitButtonText: {
    color: appColors.white,
    fontFamily: fonts.InterSemiBold,
    fontSize: 16,
  },
});