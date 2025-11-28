import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { StyleSheet } from 'react-native';
import { fontSizes, windowHeight } from '../../../theme/appConstant';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  centerView:{
    justifyContent:"center",
    // height:"80%",
    // width:"100%"
  },
  mainView:{
    marginHorizontal:20,
  },
  mainContainer:{
    //  height:windowHeight(10)
  },
  contentContainer: {
    padding: 24,
    paddingTop: 40,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
     height:56
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  height: 56, // 👈 keep same as container height
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    marginRight: -1,
    minWidth: 100,
    backgroundColor:  appColors.inputField,
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
  },
  countryCodeText: {
    fontFamily: fonts.InterMedium,
 fontSize: fontSizes.FONT16, // slightly smaller for balance
    color: '#333',
    marginRight: 8,
  },
phoneInput: {
  flex: 1,
  borderColor:"#d2b48c",
  borderWidth:1,
  paddingHorizontal: 12,
  borderTopRightRadius: 8,
  borderBottomRightRadius: 8,
  borderColor: '#e6e6e6',
  fontFamily: fonts.InterMedium,
  fontSize: fontSizes.FONT16,
  color: '#333',
  backgroundColor: appColors.inputField,
  shadowColor: appColors.blue,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 2,
  borderWidth: 0.1,
  height: 56, // 👈 match height
  textAlignVertical: 'center', // 👈 ensures text is vertically centered
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
    marginBottom: 10,
    marginTop:10
  
  },
  activeButton: {
    backgroundColor: appColors.blue,
  },
  inactiveButton: {
    backgroundColor: appColors.inActive,
    
  },
  submitButtonText: {
    color: appColors.white,
    fontFamily: fonts.InterSemiBold,
    fontSize: 16,
  },
  resendOtp: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  scrollContent: {
  flexGrow: 1,
  paddingBottom: 20, // Add some bottom padding for better scrolling
},
  disabledResend: {
    opacity: 0.5,
  },
  resendOtpText: {
    fontFamily: fonts.InterMedium,
    color: appColors.blue,
    fontSize: 14,
  },
  termsContainer: {
    marginTop: 0,
    marginHorizontal:6
  },
  checkboxContainer:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:windowHeight(32),
    marginHorizontal:windowHeight(4)
  },
  termsText: {
    fontFamily: fonts.InterRegular,
    fontSize: 11,
    color:appColors.font,
    textAlign: 'center',
    lineHeight: 20,
  },
  highlightText: {
    color: "#947757",
  },
  errorText: {
  color: appColors.error,
  fontSize: 12,
  marginTop: 4,
  marginBottom: 8,
  marginLeft: 10,
  fontFamily: fonts.InterMedium
},
errorInput: {
  borderColor: appColors.error,
  borderWidth: 1,
},
disabledResend: {
  opacity: 0.5,
},
});