import { StyleSheet } from 'react-native';
import appColors from '../../theme/appColors';
import fonts from '../../theme/appFonts';
import { fontSizes, windowHeight, windowWidth } from '../../theme/appConstant';

export const styles = StyleSheet.create({
  /* ---------- ROOT ---------- */
  container: {
    flex: 1,
    backgroundColor: appColors.background || '#000',
  },

  contentContainerStyle: {
    paddingVertical: windowHeight(20),
  },

  main: {
    padding: windowWidth(10),
    paddingHorizontal: windowWidth(20),
  },

  welcomeText: {
    fontSize: fontSizes.FONT25,
    fontFamily: fonts.InterMedium,
    color: appColors.font || '#000',
    marginTop: windowHeight(10),
  },

  /* ---------- HEADER ---------- */
  avatar: {
    height: windowHeight(50),
    width: windowHeight(50),
    borderRadius: windowHeight(25),
    backgroundColor: appColors.font || '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeSection: {
    paddingHorizontal: windowWidth(20),
    borderRadius: windowWidth(12),
    paddingVertical: windowHeight(10),
    paddingTop: windowHeight(40),
    alignItems: 'center',
  },

  headerTextContainer: {
    marginLeft: windowWidth(3),
  },

  userNameText: {
    fontSize: fontSizes.FONT20,
    fontFamily: fonts.InterRegular,
    color: appColors.font || '#000',
    marginTop: windowHeight(12),
  },

  detailText: {
    fontSize: fontSizes.FONT12,
    fontFamily: fonts.InterRegular,
    color: appColors.subTitle || '#000',
    marginBottom: windowHeight(3),
  },

  /* ---------- MENU ---------- */
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: windowHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: '#ced5dfff',
  },

  menuText: {
    fontSize: fontSizes.FONT18,
    fontFamily: fonts.InterRegular,
    color: appColors.font || '#000',
    marginLeft: windowWidth(15),
    flex: 1,
  },

  notificationBadge: {
    backgroundColor: '#E74C3C',
    width: windowWidth(25),
    height: windowWidth(25),
    borderRadius: windowWidth(15),
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    fontSize: fontSizes.FONT13,
    fontFamily: fonts.InterRegular,
    color: appColors.white || '#000',
  },

  /* ---------- SUPPORT ---------- */
  supportSection: {
    marginBottom: windowHeight(20),
  },

  /* ---------- SERVICE STATUS ---------- */
  serviceStatus: {
    backgroundColor: appColors.menuCard || '#000',
    padding: windowHeight(15),
    borderRadius: windowWidth(8),
    marginBottom: windowHeight(12),
    alignItems: 'center',
  },

  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: windowHeight(5),
  },

  statusDot: {
    width: windowWidth(8),
    height: windowWidth(8),
    borderRadius: windowWidth(4),
    marginRight: windowWidth(8),
  },

  statusOnline: {
    backgroundColor: appColors.blue || '#000',
  },

  statusText: {
    fontSize: fontSizes.FONT14,
    fontFamily: fonts.InterRegular,
    color: appColors.black || '#000',
  },

  statusSubText: {
    fontSize: fontSizes.FONT12,
    fontFamily: fonts.InterRegular,
    color: appColors.subTitle || '#000',
    textAlign: 'center',
  },

  /* ---------- LOGOUT ---------- */
  signOut: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: windowHeight(30),
    marginTop: -windowHeight(10),
  },

  signOutText: {
    fontSize: fontSizes.FONT20,
    fontFamily: fonts.InterRegular,
    color: '#E74C3C',
    marginLeft: windowWidth(10),
    marginTop: windowHeight(3),
  },
});
