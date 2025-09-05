import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { StyleSheet } from 'react-native';
import { fontSizes } from '../../../theme/appConstant';
import { windowHeight } from '../../../theme/appConstant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  header: {
    backgroundColor: appColors.white,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
    elevation: 0,
  },
  content: {
    paddingBottom: 40,
    marginTop:16
  },
  // Section Styles
  section: {
    paddingHorizontal: 24,
    marginBottom: windowHeight(3),
  
  },
  sectionTitle: {
    fontSize: 18,
    color: appColors.font,
    marginBottom: 2,
    fontFamily: fonts.PoppinsMedium,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 24,
    color: appColors.subTitle,
    marginBottom: 16,
    fontFamily:fonts.PoppinsRegular
  },
  
  // Stats Section
  statsSection: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: windowHeight(10),
    paddingBottom:14
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    width: '48%',
    backgroundColor: appColors.white,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  statNumber: {
    fontSize: fontSizes.FONT19,
    fontWeight: '800',
    color: appColors.blue,
    marginBottom: 4,
    fontFamily:fonts.PoppinsSemiBold
  },
  statLabel: {
    fontSize: 14,
    color: appColors.font,
    fontFamily:fonts.PoppinsRegular,
    textAlign: 'center',
  },
  
  // Values Section
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: windowHeight(6),
  },
  valueCard: {
    width: '48%',
    backgroundColor: appColors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  valueIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  valueTitle: {
    fontSize: 16,
    fontFamily:fonts.PoppinsMedium,
    color: appColors.font,
    marginBottom: 3,
    fontFamily:fonts.PoppinsMedium
  },
  valueText: {
    fontSize: 12,
    color: appColors.subTitle,
    lineHeight: 20,
    fontFamily:fonts.PoppinsRegular
  },
  
  // Team Section
 
  // CTA Section
  ctaContainer: {
    backgroundColor: appColors.blue,
    padding: 22,
    alignItems: 'center',
    marginTop: 20,
  },
  ctaIcon: {
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 18,
    color: appColors.white,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily:fonts.PoppinsMedium
  },
  ctaText: {
    fontSize: 14,
    color: appColors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 20,
   fontFamily:fonts.PoppinsMedium,
    lineHeight:windowHeight(20)
  },
  ctaButton: {
    backgroundColor: appColors.font,
    borderRadius: 24,
    paddingVertical:  10,
    paddingHorizontal: 32,
  },
  ctaButtonText: {
    fontSize: 14,
    color: appColors.white,
 fontFamily:fonts.PoppinsMedium
  },
});