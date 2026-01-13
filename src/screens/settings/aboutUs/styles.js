import { StyleSheet } from 'react-native';
import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { fontSizes, windowHeight, windowWidth } from '../../../theme/appConstant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },

  header: {
    backgroundColor: appColors.background,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
    elevation: 0,
  },

  content: {
    paddingBottom: windowHeight(40),
  },

  section: {
    paddingHorizontal: windowWidth(24),
    marginBottom: windowHeight(10),
  },

  sectionTitle: {
    fontSize: fontSizes.FONT18,
    color: appColors.font,
    marginBottom: windowHeight(4),
    fontFamily: fonts.InterMedium,
  },

  sectionText: {
    fontSize: fontSizes.FONT14,
    lineHeight: windowHeight(24),
    color: appColors.subTitle,
    marginBottom: windowHeight(16),
    fontFamily: fonts.InterRegular,
  },

  /* ================= STATS ================= */

  statsSection: {
    backgroundColor: appColors.menuCard,
    paddingVertical: windowHeight(22),
    paddingHorizontal: windowWidth(16),
    marginBottom: windowHeight(16),
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowHeight(16),
  },

  statItem: {
    width: '48%',
    backgroundColor: appColors.card,
    borderRadius: windowWidth(12),
    padding: windowWidth(12),
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: windowWidth(6),
    borderColor: appColors.darkBlue,
    borderWidth: 1,
  },

  statNumber: {
    fontSize: fontSizes.FONT19,
    color: appColors.blue,
    marginBottom: windowHeight(4),
    fontFamily: fonts.InterSemiBold,
  },

  statLabel: {
    fontSize: fontSizes.FONT14,
    color: appColors.font,
    textAlign: 'center',
    fontFamily: fonts.InterRegular,
  },

  /* ================= VALUES ================= */

  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: windowHeight(10),
  },

  valueCard: {
    width: '48%',
    backgroundColor: appColors.menuCard,
    borderRadius: windowWidth(12),
    padding: windowWidth(16),
    marginBottom: windowHeight(15),
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: windowWidth(4),
    borderColor: appColors.darkBlue,
    borderWidth: 1,
  },

  valueIcon: {
    width: windowWidth(48),
    height: windowWidth(48),
    borderRadius: windowWidth(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: windowHeight(12),
  },

  valueTitle: {
    fontSize: fontSizes.FONT16,
    color: appColors.font,
    marginBottom: windowHeight(4),
    fontFamily: fonts.InterMedium,
  },

  valueText: {
    fontSize: fontSizes.FONT12,
    color: appColors.subTitle,
    lineHeight: windowHeight(20),
    fontFamily: fonts.InterRegular,
  },

  /* ================= CTA ================= */

  ctaContainer: {
    backgroundColor: appColors.blue,
    paddingVertical: windowHeight(22),
    paddingHorizontal: windowWidth(20),
    alignItems: 'center',
    marginTop: windowHeight(20),
  },

  ctaIcon: {
    marginBottom: windowHeight(16),
  },

  ctaTitle: {
    fontSize: fontSizes.FONT18,
    color: appColors.white,
    marginBottom: windowHeight(8),
    textAlign: 'center',
    fontFamily: fonts.InterMedium,
  },

  ctaText: {
    fontSize: fontSizes.FONT14,
    color: appColors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: windowHeight(20),
    lineHeight: windowHeight(20),
    fontFamily: fonts.InterRegular,
  },

  ctaButton: {
    backgroundColor: appColors.font,
    borderRadius: windowWidth(24),
    paddingVertical: windowHeight(10),
    paddingHorizontal: windowWidth(32),
  },

  ctaButtonText: {
    fontSize: fontSizes.FONT14,
    color: appColors.white,
    fontFamily: fonts.InterMedium,
  },
});
