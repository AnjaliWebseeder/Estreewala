import { StyleSheet } from 'react-native';
import appColors from '../../../theme/appColors';
import fonts from '../../../theme/appFonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  content: {
    paddingHorizontal: 20,
    marginTop:5
    
  },
  subtitle: {
    fontSize: 14,
    color: appColors.subTitle,
    fontFamily: fonts.PoppinsRegular,
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: appColors.font,
    fontFamily: fonts.PoppinsMedium,
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
    fontFamily: fonts.PoppinsRegular,
  },
  saveButton: {
    backgroundColor: appColors.blue,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 14,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fonts.PoppinsSemiBold,
  },
  passwordRequirements: {
    fontSize: 12,
    color: appColors.subTitle,
    fontFamily: fonts.PoppinsRegular,
    lineHeight: 20,
  },
    errorText: {
    color: appColors.error || '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    fontFamily: fonts.PoppinsRegular,
  }
});