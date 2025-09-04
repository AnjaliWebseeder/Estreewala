import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { StyleSheet } from 'react-native';
import { fontSizes } from '../../../theme/appConstant';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 40,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
     height:56
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    marginRight: -1,
    minWidth: 100,
    backgroundColor: appColors.white,
    shadowColor: appColors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    borderWidth:0.1,
   
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
    top:-3
  },
  countryCodeText: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: fontSizes.FONT18,
    color: '#333',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
  
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    fontFamily: fonts.PoppinsMedium,
     fontSize: fontSizes.FONT18,
    color: '#333',
    backgroundColor: appColors.white,
    shadowColor: appColors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    borderWidth:0.1
  },
  focusedInput: {
    borderColor: appColors.blue,
    backgroundColor: '#fff',
  },
  submitButton: {
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  activeButton: {
    backgroundColor: appColors.blue,
  },
  inactiveButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: appColors.white,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 16,
  },
  resendOtp: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  disabledResend: {
    opacity: 0.5,
  },
  resendOtpText: {
    fontFamily: fonts.PoppinsMedium,
    color: appColors.blue,
    fontSize: 14,
  },
  termsContainer: {
    marginTop: 0,
  },
  termsText: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 12,
    color:appColors.font,
    textAlign: 'center',
    lineHeight: 20,
  },
  highlightText: {
    color: appColors.blue,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 18,
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  countryName: {
    flex: 1,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  dialCode: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 16,
    color:appColors.font,
  },
});