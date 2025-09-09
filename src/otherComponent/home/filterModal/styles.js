import { StyleSheet } from "react-native";
import fonts from "../../../theme/appFonts";
import appColors from "../../../theme/appColors";
import { windowHeight } from "../../../theme/appConstant";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 17,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: windowHeight(9),
  },
  modalTitle: {
    fontSize: 20,
    fontFamily:fonts.PoppinsMedium,
    color:appColors.font
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontFamily:fonts.PoppinsMedium,
    color: appColors.font,
    marginBottom: 6,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom:5
  },
  optionButtonSelected: {
    backgroundColor: appColors.font,
    borderColor: appColors.font,
  },
  optionText: {
    fontSize: 14,
    color:appColors.subTitle,
    fontFamily:fonts.PoppinsRegular,
  },
  optionTextSelected: {
    color:appColors.white,
   fontFamily:fonts.PoppinsRegular
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  applyButton: {
    backgroundColor: appColors.font,
  },
  resetButtonText: {
    color: '#666',
    fontFamily:fonts.PoppinsMedium,
  },
  applyButtonText: {
    color:appColors.white,
    fontFamily:fonts.PoppinsMedium,
  },
    ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})