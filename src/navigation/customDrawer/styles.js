import { StyleSheet } from 'react-native';
import appColors from '../../theme/appColors';
import fonts from '../../theme/appFonts';
import { windowHeight } from '../../theme/appConstant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:appColors.white,
    elevation:5
  },
  contentContainerStyle:{
    paddingBottom:20
  },
  main:{
   padding:10,
   paddingHorizontal:20
  },
  welcomeText: {
    fontSize: 20,
    fontFamily:fonts.InterMedium,
    color: appColors.font,
    marginTop: 10,
  },


  // Quick Actions

  // Menu Section
  menuSection: {
    // marginBottom: 20,
  },
   avatar: {
    height:windowHeight(50),
    width:windowHeight(50),
    borderRadius:30,
    backgroundColor:appColors.font,
    alignItems:"center",
    justifyContent:"center",
  },
    welcomeSection: {
    paddingHorizontal: 20,
    borderRadius: 12,
    paddingVertical:10,
    paddingBottom:10,
    // backgroundColor:appColors.lightBlue,
    paddingTop:'10%',
    alignItems:"center"
  },
  headerTop: {
   
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTextContainer: {
    marginLeft: 3,
  },
  userNameText: {
    fontSize: 16,
    color: appColors.font,
    fontFamily:fonts.InterRegular,
    marginTop: 12,
  },
  userDetails: {
    marginTop: 0,
  },
  detailText: {
    fontSize: 12,
    color: appColors.subTitle, // light text for gradient background
    marginTop: 0,
    fontFamily:fonts.InterRegular,
    marginBottom:3
  },
  phoneText: {
    fontSize: 14,
    color: '#E0F8FC',
    fontFamily:fonts.InterRegular,
    marginTop: 2,
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
    fontFamily:fonts.InterRegular,
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
    fontFamily:fonts.InterRegular,
    paddingTop:1
  },

  // Support Section
  supportSection: {
    marginBottom: 20,
    
  },

  // Service Status
  serviceStatus: {
    backgroundColor: '#f7f7fbff',
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
   fontFamily:fonts.InterRegular,
  },
  statusSubText: {
    fontSize: 12,
    color: appColors.subTitle,
    textAlign: 'center',
       fontFamily:fonts.InterRegular,
  },
  // Sign Out
  signOut: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: '30%',
   marginTop:-10
   
  },
  signOutText: {
    fontSize: 16,
     fontFamily:fonts.InterRegular,
    color: "#E74C3C",
    marginLeft: 10,
    marginTop:3
  },
});