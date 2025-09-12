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
   borderWidth:0.7,
   borderRadius:10
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
    fontFamily: fonts.InterMedium,
    marginRight: 8,
  },
  details: { 
    fontSize: 13, 
    color: appColors.subTitle, 
    fontFamily: fonts.InterRegular,
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
    borderWidth: 1.2,
    borderColor: appColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: appColors.font,
  },
  radioInner: {
    height: 6,
    width: 6,
    borderRadius: 5,
    backgroundColor: appColors.font,
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
    fontFamily: fonts.InterSemiBold,
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
    fontFamily: fonts.InterRegular,
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
    fontFamily: fonts.InterMedium
  },

  applyBtn: {
    backgroundColor: appColors.blue,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    paddingVertical:12
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
    paddingHorizontal: 16,
    backgroundColor: appColors.blueLight,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
    paddingBottom:16,
    paddingTop:2
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
    fontFamily: fonts.InterRegular,
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
    fontFamily: fonts.InterRegular,
    color: appColors.font,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: appColors.subTitle,
    textAlign: 'center',
    fontFamily: fonts.InterRegular,
    lineHeight: 27
  },
});