import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { StyleSheet, Dimensions } from 'react-native';
import { fontSizes } from '../../../theme/appConstant';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'space-between',
    padding: 24,
  },
  formContainer: {
    marginBottom: 24,
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
  backToLoginButton: {
    padding: 16,
    alignItems: 'center',
  },
  backToLoginText: {
    fontFamily: fonts.InterRegular,
    color: appColors.blue,
    fontSize: fontSizes.FONT16,
  },
});