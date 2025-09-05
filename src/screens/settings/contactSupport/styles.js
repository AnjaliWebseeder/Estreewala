import { StyleSheet } from 'react-native';
import { fontSizes } from '../../../theme/appConstant';
import { windowHeight } from '../../../theme/appConstant';
import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor:  "#F8F9FD" },
  content: {
    padding: 16,
  },
  helpTitle: {
    fontSize: 17,
    fontFamily:fonts.PoppinsMedium,
    color: appColors.blue,
    marginBottom: 5,
   
  },
  helpSubText: {
    fontSize: 14,
     fontFamily:fonts.PoppinsRegular,
    color:appColors.font,
    marginBottom: 23,
    lineHeight:25
  },
  cardBox: {
    backgroundColor: appColors.white,
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
   fontFamily:fonts.PoppinsRegular,
    color: appColors.font,
    marginLeft: 8,
  },
  cardValue: {
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    color:appColors.blue,
    marginLeft: 28,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageLabel: {
    fontSize: 14,
fontFamily:fonts.PoppinsRegular,
    marginLeft: 6,
    color: '#000',
  },
  textInput: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 12,
fontFamily:fonts.PoppinsRegular,
    fontSize: 14,
    minHeight: windowHeight(100),
    color:appColors.black
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color:appColors.font,
    marginTop: 4,
fontFamily:fonts.PoppinsRegular,
  },
  submitBtn: {
    backgroundColor: appColors.blue,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {
    color:appColors.white,
  fontFamily:fonts.PoppinsMedium,
    fontSize: 16,
  },
  disabledBtn: {
  backgroundColor: '#cccccc',
},
});
