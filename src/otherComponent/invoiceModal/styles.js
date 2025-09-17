import { StyleSheet } from "react-native";
import appColors from "../../theme/appColors";
import fonts from '../../theme/appFonts'
import { fontSizes } from '../../theme/appConstant';
export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: appColors.white,
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  modalTitle: {
    fontSize: fontSizes.FONT20,
    fontFamily: fonts.InterSemiBold,
    color: appColors.font,
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: appColors.border,
    gap: 12,
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  downloadButton: {
    backgroundColor: appColors.blue,
  },
  shareButton: {
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: appColors.blue,
  },
  downloadButtonText: {
    color: appColors.white,
    fontFamily: fonts.InterMedium,
    fontSize: fontSizes.FONT16,
  },
  shareButtonText: {
    color: appColors.blue,
    fontFamily: fonts.InterMedium,
    fontSize: fontSizes.FONT16,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  invoiceNumber: {
    fontSize: fontSizes.FONT18,
    fontFamily: fonts.InterSemiBold,
    color: appColors.font,
    marginBottom: 4,
  },
  invoiceDate: {
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.InterRegular,
    color: appColors.subTitle,
    marginBottom: 2,
  },
  logoContainer: {
    backgroundColor: appColors.blue,
    padding: 8,
    borderRadius: 6,
  },
  logoText: {
    color: appColors.white,
    fontFamily: fonts.InterBold,
    fontSize: fontSizes.FONT16,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: fontSizes.FONT16,
    fontFamily: fonts.InterSemiBold,
    color: appColors.font,
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.InterMedium,
    color: appColors.subTitle,
  },
  detailValue: {
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.InterMedium,
    color: appColors.font,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  tableCell: {
    flex: 1,
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.InterRegular,
    color: appColors.font,
  },
  tableHeaderText: {
    fontFamily: fonts.InterSemiBold,
    color: appColors.font,
  },
  itemName: {
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.InterMedium,
    color: appColors.font,
    marginBottom: 2,
  },
  itemService: {
    fontSize: fontSizes.FONT12,
    fontFamily: fonts.InterRegular,
    color: appColors.subTitle,
  },
  summarySection: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.InterRegular,
    color: appColors.subTitle,
  },
  summaryValue: {
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.InterMedium,
    color: appColors.font,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: appColors.border,
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: fontSizes.FONT16,
    fontFamily: fonts.InterSemiBold,
    color: appColors.font,
  },
  totalValue: {
    fontSize: fontSizes.FONT16,
    fontFamily: fonts.InterSemiBold,
    color: appColors.font,
  },
  termsSection: {
    marginBottom: 20,
  },
  termsTitle: {
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.InterSemiBold,
    color: appColors.font,
    marginBottom: 8,
  },
  termsText: {
    fontSize: fontSizes.FONT12,
    fontFamily: fonts.InterRegular,
    color: appColors.subTitle,
    lineHeight: 18,
  },
  disabledButton: {
  opacity: 0.6,
},
});