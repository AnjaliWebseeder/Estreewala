import { StyleSheet } from 'react-native';
import appColors from '../../../theme/appColors';
import fonts from '../../../theme/appFonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  content: {
    paddingHorizontal: 20,
    marginTop:5
    
  },
  subtitle: {
    fontSize: 14,
    color: appColors.subTitle,
    fontFamily: fonts.InterRegular,
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: appColors.font,
    fontFamily: fonts.InterMedium,
    marginBottom: 8,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: appColors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: appColors.font,
    fontFamily: fonts.InterRegular,
  },
  saveButton: {
    backgroundColor: appColors.blue,
    borderRadius: 10,
    paddingVertical:12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 14,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fonts.InterSemiBold,
  },
  passwordRequirements: {
    fontSize: 12,
    color: appColors.subTitle,
    fontFamily: fonts.InterRegular,
    lineHeight: 20,
  },
    errorText: {
    color: appColors.error || '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    fontFamily: fonts.InterRegular,
  }
});