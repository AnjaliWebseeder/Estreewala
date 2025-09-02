import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 40,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: fonts.PoppinsMedium,
    color: appColors.blue,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: appColors.blue,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: appColors.white,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 16,
  },
  phoneLoginButton: {
    borderWidth: 1,
    borderColor: appColors.blue,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  phoneLoginButtonText: {
    color: appColors.blue,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 16,
  },
});