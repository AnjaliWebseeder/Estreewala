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
    fontFamily: fonts.InterMedium,
    color: appColors.font
  },
  filterSection: {
    marginBottom: 18,
  },
  filterLabel: {
    fontSize: 16,
    fontFamily: fonts.InterMedium,
    color: appColors.font,
    // marginBottom: 6,
  },
  sliderContainer: {
    // marginTop: 10,
   
  },
  slider: {
    width: '100%',
    // height: 30,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
 
  },
  sliderLabel: {
    fontSize: 12,
    color: appColors.subTitle,
    fontFamily: fonts.InterRegular,
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
    fontFamily: fonts.InterMedium,
  },
  applyButtonText: {
    color: appColors.white,
    fontFamily: fonts.InterMedium,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 4,
  },
});