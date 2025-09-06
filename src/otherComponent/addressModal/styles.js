import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";

const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 7,
    textAlign: "center",
    color: appColors.font,
    fontFamily: fonts.PoppinsMedium
  },
  sectionLabel: {
    fontSize: 14,
    color: appColors.font,
    marginBottom: 8,
    fontFamily: fonts.PoppinsMedium
  },
  
  // Address Type Row Styles
  addressTypeRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    marginBottom: 10,
  },
  addressTypeOption: {
    alignItems: "center",
  },
  radioContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    alignItems:"center",
    marginRight:20
  },
  // Radio Button Styles
  radioOuter: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.border,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: appColors.font,
  },
  radioInner: {
    width: 6.4,
    height: 6.4,
    borderRadius: 5,
    backgroundColor: appColors.font,
  },
  addressTypeIcon: {
    marginRight: 6,
  },
  addressTypeLabel: {
    fontSize: 14,
    color: appColors.subTitle,
    fontFamily: fonts.PoppinsRegular
  },
  addressTypeLabelSelected: {
    fontFamily: fonts.PoppinsMedium
  },

  // Input Styles
  input: {
    borderWidth: 1,
    borderColor: appColors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    color: appColors.font,
    lineHeight:23
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: appColors.error,
  },
  errorText: {
    color: appColors.error,
    fontSize: 12,
    marginBottom: 12,
    fontFamily: fonts.PoppinsRegular
  },
  
  // Button Styles
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 12,
  },
  modalBtn: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#FF4D4D",
  },
  cancelBtnText: {
    color: appColors.white,
    fontFamily: fonts.PoppinsMedium
  },
  saveBtn: {
    backgroundColor: appColors.blue,
  },
  saveBtnText: {
    color: appColors.white,
    fontFamily: fonts.PoppinsMedium
  },
});