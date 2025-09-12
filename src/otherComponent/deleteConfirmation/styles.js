const { StyleSheet } = require("react-native");
import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 12,
    padding: 20,
    maxWidth: 340,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 12,
 color: appColors.font,
    fontFamily:fonts.InterMedium,
    textAlign:"center"
  },
  modalMessage: {
    fontSize: 14,
    color: appColors.subTitle,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 22,
     fontFamily:fonts.InterRegular,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  modalBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#f0f0f0",
  },
  cancelBtnText: {
     color: appColors.subTitle,
      fontFamily:fonts.InterMedium,
  },
  deleteBtn: {
    backgroundColor: "#FF4D4D",
  },
  deleteBtnText: {
    color: appColors.white,
      fontFamily:fonts.InterMedium,
    
  },
});