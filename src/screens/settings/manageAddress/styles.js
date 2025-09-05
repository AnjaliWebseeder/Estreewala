import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";

const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appColors.white },
  card: {
    backgroundColor: appColors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
   borderColor:appColors.border,
   borderWidth:1,
   borderRadius:10
  },
  selectedCard: {
    borderColor: appColors.blue,
    backgroundColor: appColors.blueLight + '20',
  },
  row: { 
    flexDirection: "row", 
    alignItems: "center",
  },
  addressDetails: {
    flex: 1,
    marginLeft: 10,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: appColors.font,
    fontFamily: fonts.PoppinsMedium,
    marginRight: 8,
  },
  details: { 
    fontSize: 13, 
    color: appColors.subTitle, 
    fontFamily: fonts.PoppinsRegular,
    lineHeight: 25,
  },
  iconBtn: { 
    marginLeft: 10,
    padding: 4,
  },
  locationIcon: {
    marginLeft: 8,
  },

  // Radio Button Styles
  radioButton: {
    padding: 4,
  },
  radioOuter: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: appColors.blue,
  },
  radioInner: {
    height: 6,
    width: 6,
    borderRadius: 5,
    backgroundColor: appColors.blue,
  },

  // Default Badge
  defaultBadge: {
    backgroundColor: appColors.greenLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    color: appColors.green,
    fontSize: 10,
    fontFamily: fonts.PoppinsSemiBold,
  },

  // Set Default Button
  setDefaultBtn: {
    marginTop: 6,
    paddingTop: 0,
    backgroundColor: appColors.blueLight,
    borderRadius: 6,
    alignItems: "flex-end",
  },
  setDefaultText: {
    color: appColors.blue,
    fontSize: 11,
    fontFamily: fonts.PoppinsRegular,
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: appColors.border,
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  addBtnText: {
    marginLeft: 6,
    fontSize: 15,
    color: appColors.blue,
    fontFamily: fonts.PoppinsMedium
  },

  applyBtn: {
    backgroundColor: appColors.blue,
    padding: 14,
    marginHorizontal: 16,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: "center",
  },
  applyBtnDisabled: {
    backgroundColor: appColors.grayLight,
  },
  applyBtnText: { 
    color: appColors.white, 
    fontSize: 16,  
    fontFamily: fonts.PoppinsMedium 
  },
  
  currentLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: appColors.blueLight,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  currentLocationBtnDisabled: {
    opacity: 0.7,
  },
  currentLocationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLocationText: {
    marginLeft: 12,
    fontSize: 16,
    color: appColors.blue,
    fontFamily: fonts.PoppinsRegular,
  },
  loadingSpinner: {
    // Style for loading indicator
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: fonts.PoppinsRegular,
    color: appColors.font,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: appColors.subTitle,
    textAlign: 'center',
    fontFamily: fonts.PoppinsRegular,
    lineHeight: 27
  },
});