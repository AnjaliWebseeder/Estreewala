import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 20,
  },
  menuCard: {
    backgroundColor: appColors.white,
    borderRadius: 16,
    paddingHorizontal: 0,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    paddingBottom:10
  },
  sectionTitle: {
    fontSize: 16,
    color: appColors.font,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    fontFamily:fonts.PoppinsMedium
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: appColors.white,
    borderRadius: 12,
    paddingBottom:5
  
  },
  lastMenuItem: {
    marginBottom: 0,
  },
  iconBox: {
    width: 30,
    height: 40,
    borderRadius: 12,
    backgroundColor: appColors.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: appColors.font,
   fontFamily:fonts.PoppinsRegular,
    flex: 1,
  }
});