import { StyleSheet } from "react-native";
import { fontSizes, windowHeight, windowWidth } from "../../theme/appConstant";
import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:appColors.background,
  
  },
  main:{
    backgroundColor:appColors.darkBlue,
    marginBottom:windowHeight(15),
    
  },
  contentContainerStyle:{
    paddingBottom:windowHeight(100)
  },
  card: {
    backgroundColor:appColors.card,
    paddingBottom: 12,
    paddingTop:10,
    borderColor:appColors.darkBlue,
    borderWidth:1,
    marginHorizontal:13,
     borderRadius: 10,
 

  },
  separator: {
   
    // backgroundColor:appColors.lightBorder, // light divider
    marginBottom:windowHeight(10),
   
  },
  dot:{
    height:4,
    width:4,
    backgroundColor:appColors.border,
    borderRadius:20,
    marginLeft:10,
    marginRight:6
  },
   border: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: appColors.darkBlue,
    marginVertical: 6,
    margin:8,
    marginTop:10



    
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
    fontFamily:fonts.InterMedium,
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
  fontFamily:fonts.InterRegular,
 fontWeight:"700"
  },
    tabContainer: {
  flexDirection: "row",
  borderBottomWidth: 1,
  borderColor: "#dcd6d6ff",
  marginBottom: windowHeight(10),
},

tab: {
  flex: 1,
  alignItems: "center",
  paddingVertical: 12,
  position: "relative",
  marginHorizontal:15
},

tabText: {
  fontSize: fontSizes.FONT15HALF,
  fontFamily: fonts.InterMedium,
  color: "#6e6e6e", // gray text for inactive tabs
},

activeTabText: {
  color: appColors.white, // your theme’s primary red
  fontFamily: fonts.InterSemiBold,
},

tabIndicator: {
  position: "absolute",
  bottom: 0,
  height: 2,
  width: "100%",
  backgroundColor: appColors.border,
  borderRadius: 2,
},
  
  scheduledInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  scheduledText: {
    fontSize: 12,
    color:appColors.blue,
    marginLeft: 4,
    fontFamily: fonts.InterMedium,
  },
  progressInfo: {
    marginTop: 4,
  },
  progressText: {
    fontSize: 12,
    color: appColors.primary,
    fontFamily: fonts.InterMedium,
    fontStyle: "italic",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: appColors.gray,
    fontFamily: fonts.InterMedium,
    marginTop: 16,
  },
});
