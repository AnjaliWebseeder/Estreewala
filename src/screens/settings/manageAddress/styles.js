import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { windowHeight, windowWidth, fontSizes } from "../../../theme/appConstant";
const { StyleSheet, useWindowDimensions } = require("react-native");

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appColors.background },
  card: {
    backgroundColor: appColors.menuCard,
    borderRadius: 10,
    paddingHorizontal: windowWidth(12),
    paddingVertical: windowHeight(5),
    marginBottom: windowHeight(12),
    borderColor: appColors.border,
    borderWidth: 0.7,
    borderRadius: 10
  },
  selectedCard: {
    borderColor: appColors.font,
    backgroundColor: appColors.blueLight + '20',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressDetails: {
    flex: 1,
    marginLeft: windowWidth(7),
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: windowHeight(4),
  },
  title: {
    fontSize: fontSizes.FONT15,
    fontWeight: "600",
    color: appColors.font,
    fontFamily: fonts.InterMedium,
    marginRight: windowWidth(8),
  },
  details: {
    fontSize: fontSizes.FONT15,
    color: appColors.subTitle,
    fontFamily: fonts.InterRegular,
    lineHeight: windowHeight(18)
  },
  iconBtn: {
    marginLeft: windowWidth(7),
    paddingHorizontal: windowWidth(4),
    paddingVertical: windowHeight(4),
  },
  locationIcon: {
    marginLeft: windowWidth(8),
  },

  // Radio Button Styles
  radioButton: {
    paddingHorizontal: windowWidth(5),
    paddingVertical: windowHeight(5),
  },
  radioOuter: {
    height: windowWidth(20),
    width: windowWidth(20),
    borderRadius: windowWidth(10),
    borderWidth: 1.5,
    borderColor: appColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: appColors.font,
  },
  radioInner: {
    height: windowWidth(10),
    width: windowWidth(10),
    borderRadius: windowWidth(5),
    backgroundColor: appColors.font,
  },
  // Default Badge
  defaultBadge: {
    backgroundColor: "#c5f0d0",
    paddingHorizontal: windowWidth(10),
    paddingVertical: windowHeight(2),
    borderRadius: 10,
  },
  defaultText: {
    color: "green",
    fontSize: fontSizes.FONT10,
    fontFamily: fonts.InterSemiBold,
  },

  // Set Default Button (Stylish)
  setDefaultBtn: {
    marginTop: windowHeight(6),
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: windowHeight(1),
    paddingHorizontal: windowWidth(10),

    backgroundColor: "#e7f3f6",
    borderRadius: 20,

    alignSelf: "flex-end",

    borderWidth: 1,
    borderColor: "#0a8ba5",

    // subtle elevation
    shadowColor: "#0a8ba5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },

  setDefaultText: {
    color: "#0a8ba5",
    fontSize: fontSizes.FONT12,
    fontFamily: fonts.InterSemiBold,
    letterSpacing: 0.4,
  },


  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: appColors.border,
    paddingHorizontal: windowWidth(12),
    paddingVertical: windowHeight(12),
    marginHorizontal: windowWidth(16),
    borderRadius: 10,
    marginBottom: windowHeight(12),
  },
  addBtnText: {
    marginLeft: windowWidth(6),
    fontSize: 15,
    color: appColors.blue,
    fontFamily: fonts.InterMedium
  },

  applyBtn: {
    backgroundColor: appColors.blue,
    paddingHorizontal: windowWidth(14),
    marginHorizontal: windowWidth(16),
    borderRadius: 10,
    marginBottom: windowHeight(20),
    alignItems: "center",
    paddingVertical: windowHeight(12)
  },
  applyBtnDisabled: {
    backgroundColor: appColors.grayLight,
  },
  applyBtnText: {
    color: appColors.white,
    fontSize: 16,
    fontFamily: fonts.InterMedium
  },

  currentLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: windowWidth(16),
    backgroundColor: appColors.blueLight,
    borderBottomWidth: 1,
    borderBottomColor: appColors.darkBlue,
    paddingBottom: windowHeight(16),
    paddingTop: windowHeight(2)
  },
  currentLocationBtnDisabled: {
    opacity: 0.7,
  },
  currentLocationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationUnavailableText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
  },
  currentLocationText: {
    marginLeft: windowWidth(12),
    fontSize: 16,
    color: appColors.blue,
    fontFamily: fonts.InterRegular,
  },
  loadingSpinner: {
    // Style for loading indicator
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: windowHeight(40),
    paddingHorizontal: windowWidth(40)
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: fonts.InterRegular,
    color: appColors.font,
    marginTop: windowHeight(16),
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: appColors.subTitle,
    textAlign: 'center',
    fontFamily: fonts.InterRegular,
    lineHeight: windowHeight(27)
  },
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.white,
    paddingHorizontal: windowWidth(16),
    paddingVertical: windowHeight(14),
    marginBottom: windowHeight(20),
    marginHorizontal: windowWidth(16),
    marginTop: windowHeight(8),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: appColors.darkBlue,
    borderStyle: 'dashed',
  },
  addNewButtonText: {
    marginLeft: windowWidth(8),
    fontSize: 16,
    color: appColors.darkBlue,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111827",
  },

  modalAddress: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },

  modalCloseBtn: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: appColors.darkBlue,
    alignItems: "center",
  },

  modalCloseText: {
    color: "#fff",
    fontWeight: "600",
  },

});