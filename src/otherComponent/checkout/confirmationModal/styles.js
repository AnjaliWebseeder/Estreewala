import { StyleSheet } from 'react-native';
import { windowHeight } from '../../../theme/appConstant';
import { fontSizes } from '../../../theme/appConstant';
import fonts from '../../../theme/appFonts'
import appColors from "../../../theme/appColors";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: fontSizes.FONT18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: appColors.font,
    fontFamily: fonts.PoppinsSemiBold
  },
  modalMessage: {
    fontSize: fontSizes.FONT16,
    textAlign: 'center',
    marginBottom: 20,
    color: appColors.font,
    fontFamily: fonts.PoppinsRegular,
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: windowHeight(12),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: appColors.lightBorder,
  },
  confirmButton: {
    backgroundColor: appColors.error,
  },
  cancelButtonText: {
    color: appColors.font,
    fontFamily: fonts.PoppinsMedium,
    fontSize: fontSizes.FONT16,
  },
  confirmButtonText: {
    color: 'white',
    fontFamily: fonts.PoppinsMedium,
    fontSize: fontSizes.FONT16,
  },
});