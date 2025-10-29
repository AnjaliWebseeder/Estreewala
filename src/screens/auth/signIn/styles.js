// styles.js
import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { StyleSheet } from 'react-native';
import { fontSizes, windowHeight } from '../../../theme/appConstant';

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
   
  },
  formContainer: {
    marginHorizontal:15,
    marginBottom:60
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 6,
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
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',   
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
    marginBottom: 17,
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
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:18
  },
  phoneLoginButtonText: {
    color: appColors.font,
    fontFamily: fonts.InterSemiBold,
    fontSize: 16,
  },
});