import { StyleSheet } from "react-native";
import { windowHeight } from "../../theme/appConstant";
import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:appColors.white,
  
  },
  contentContainerStyle:{
    paddingBottom:windowHeight(100)
  },
  card: {
    backgroundColor:appColors.white,
    paddingBottom: 12,
    paddingTop:1
  },
  separator: {
    height: 3,
    backgroundColor:appColors.lightBorder, // light divider
    marginBottom:windowHeight(10),
    marginTop:windowHeight(2)
  },
  dot:{
    height:4,
    width:4,
    backgroundColor:appColors.border,
    borderRadius:20,
    marginLeft:20,
    marginRight:6
  },
   border: {
    borderBottomWidth: 2,
  borderColor: appColors.lightBorder,
  borderStyle: "dotted",
  marginTop:windowHeight(8),
  marginBottom:windowHeight(2)
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 12,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontFamily:fonts.InterSemiBold,
    color: appColors.font,
    marginBottom:windowHeight(0),
    marginTop:windowHeight(2)
  },
  date: {
    fontSize: 12,
    color: "#8E8E93",
    fontFamily:fonts.InterRegular
  },
  subText: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 2,
    fontFamily:fonts.InterRegular
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 6,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
  fontFamily:fonts.InterRegular
  },
});
