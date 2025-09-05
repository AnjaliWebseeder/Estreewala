import { StyleSheet, Platform } from "react-native";
import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";
import { windowHeight } from "../../theme/appConstant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "#F8F9FD",
  },

  scrollContent: {
    padding: 16,
    paddingTop: 24,
   
  },
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 17,
    paddingHorizontal: 8,
      paddingVertical:10,
    ...Platform.select({
      ios: {
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 1,
      },
    
    }),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal:3,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 4,
    paddingVertical:5,
   
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: appColors.font,
    fontFamily:fonts.PoppinsRegular,
    flex: 1,
  },
  chevron: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: appColors.subTitle,
    transform: [{ rotate: '45deg' }],
    marginHorizontal:10,
    fontFamily:fonts.PoppinsRegular
  },
  signOutBtn: {
    marginTop: '10%',
    padding: 14,
    borderRadius: 12,
    borderColor: appColors.blue,
    borderWidth:1,
    alignItems: "center",
    flexDirection:"row",
    justifyContent:"center",
    marginHorizontal:14
  },
  signOutText: {
    fontSize: 16,
    color: appColors.blue,
    fontFamily:fonts.PoppinsMedium,
    marginHorizontal:10
  },
});