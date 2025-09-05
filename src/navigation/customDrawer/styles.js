import { StyleSheet } from 'react-native';
import appColors from '../../theme/appColors';
import fonts from '../../theme/appFonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:appColors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  
  // Welcome Section
  welcomeSection: {
    alignItems: "center",
    marginBottom: 5,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily:fonts.PoppinsMedium,
    color: appColors.font,
    marginTop: 10,
  },
  phoneText: {
    fontSize: 14,
    color: "#7F8C8D",
     fontFamily:fonts.PoppinsRegular,
  },

  // Quick Actions

  // Menu Section
  menuSection: {
    // marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor:appColors.lightGray,
  },
  menuText: {
    fontSize: 14,
    fontFamily:fonts.PoppinsRegular,
    color: appColors.font,
    marginLeft: 15,
    flex: 1,
  },
  notificationBadge: {
    backgroundColor: '#E74C3C',
    width: 16,
    height: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: appColors.white,
    fontSize: 9,
    fontFamily:fonts.PoppinsRegular,
    paddingTop:1
  },

  // Support Section
  supportSection: {
    marginBottom: 20,
    
  },

  // Service Status
  serviceStatus: {
    backgroundColor: appColors.lightBlue,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 15,
    marginRight: 8,
    marginBottom:2,
    marginHorizontal:6
  },
  statusOnline: {
    backgroundColor: appColors.blue,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
   fontFamily:fonts.PoppinsRegular,
  },
  statusSubText: {
    fontSize: 12,
    color: appColors.subTitle,
    textAlign: 'center',
       fontFamily:fonts.PoppinsRegular,
  },
  // Sign Out
  signOut: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
   
  },
  signOutText: {
    fontSize: 16,
     fontFamily:fonts.PoppinsRegular,
    color: "#E74C3C",
    marginLeft: 10,
    marginTop:3
  },
});