// styles.js
import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { StyleSheet } from 'react-native';
import { fontSizes } from '../../../theme/appConstant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  formContainer: {
    marginBottom: 24,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    top:-10
  
  },
  forgotPasswordText: {
    fontFamily: fonts.InterRegular,
    color: appColors.blue,
    fontSize: fontSizes.FONT16,
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
    backgroundColor: '#D3D3D3',
  },
  submitButtonText: {
    color: appColors.white,
    fontFamily: fonts.InterMedium,
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop:20
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: appColors.border,
  },
  dividerText: {
    fontFamily: fonts.InterRegular,
    color: appColors.subTitle,
    fontSize: 14,
    marginHorizontal: 16,
  },
  phoneLoginButton: {
    borderWidth: 1,
    borderColor: appColors.border,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  phoneLoginButtonText: {
    color: appColors.font,
    fontFamily: fonts.InterSemiBold,
    fontSize: 16,
  },
});