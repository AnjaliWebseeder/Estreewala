import { StyleSheet, Dimensions } from 'react-native';
import { windowHeight, windowWidth } from '../../theme/appConstant';
import appColors from '../../theme/appColors';
import fonts from '../../theme/appFonts';
import { fontSizes } from '../../theme/appConstant';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
  },
  bottomModalContainer: {
    backgroundColor: appColors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: appColors.lightBorder,
  },
  modalTitle: {
    fontSize: fontSizes.FONT18,
    fontWeight: 'bold',
    color: appColors.font,
    fontFamily: fonts.InterSemiBold,
    flex: 1,
    marginLeft: 10,
  },
  closeButton: {
    padding: 5,
  },
  reasonsContainer: {
    maxHeight: height * 0.5,
    marginBottom: 20,
  },
  reasonTitle: {
    fontSize: fontSizes.FONT16,
    color: appColors.font,
    fontFamily: fonts.InterMedium,
    marginBottom: 6,
  },
  reasonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: appColors.lightBorder,
  },
  selectedReasonOption: {
    backgroundColor: appColors.menuCard,
    borderRadius: 8,
  },
  radioContainer: {
    marginRight: 12,
  },
  radioOuter: {
    width: 12,
    height: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: appColors.blue,
  },
  radioInner: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: appColors.blue,
  },
  reasonText: {
    fontSize: fontSizes.FONT14HALF,
    color: appColors.font,
    fontFamily: fonts.InterRegular,
    flex: 1,
  },
  otherReasonContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: appColors.lightBackground,
    borderRadius: 8,
  },
  otherReasonLabel: {
    fontSize: fontSizes.FONT14,
    color: appColors.font,
    fontFamily: fonts.InterMedium,
    marginBottom: 8,
  },
  otherReasonInput: {
    borderWidth: 1,
    borderColor: appColors.lightBorder,
    borderRadius: 8,
    padding: 12,
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.InterRegular,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: windowHeight(12),
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: appColors.lightBorder,
  },
  confirmButton: {
    backgroundColor: '#e53935',
  },
  disabledButton: {
    backgroundColor: appColors.lightGray,
    opacity: 0.6,
  },
  cancelButtonText: {
    color: appColors.font,
    fontFamily: fonts.InterMedium,
    fontSize: fontSizes.FONT16,
  },
  confirmButtonText: {
    color:appColors.white,
    fontFamily: fonts.InterMedium,
    fontSize: fontSizes.FONT16,
  },
});