import { StyleSheet } from "react-native";
import fonts from "../../../theme/appFonts";
import appColors from "../../../theme/appColors";
import { fontSizes, windowHeight } from "../../../theme/appConstant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  searchTitle: {
    fontSize: fontSizes.FONT22,
    color: appColors.font,
    paddingHorizontal: 20,
    marginTop: windowHeight(10),
    fontFamily: fonts.InterMedium,
    marginBottom:windowHeight(4)
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20, 
  },
  contentContainerStyle:{
    paddingBottom:windowHeight(40)
  },
  textStyle:{
    fontSize: 16, color: appColors.font,
    fontFamily:fonts.InterRegular
  },
  card: {
    flexDirection: 'row',
    backgroundColor: appColors.white,
    borderRadius: 16,
    minHeight: 110,
    alignItems: 'center',
    marginBottom: 8, // 🔹 Reduced distance between cards
  },
  imageWrapper: {
  backgroundColor: '#fff',        // white background for shadow
  borderRadius: 16,               // must match image radius
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 3,                   // Android shadow
  marginRight: windowHeight(15),  
  paddingVertical:6  ,
  paddingHorizontal:4            // keep spacing
},
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 14,
    //  marginRight: 14,
    
  },
  cardContent: {
    flex: 1,
    paddingVertical: windowHeight(2.8),
    paddingHorizontal: 2,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
   fontFamily:fonts.InterMedium,
   color:appColors.font,
    marginBottom: 2,
  },
  cardLocation: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
     fontFamily:fonts.InterRegular,
  },
  locationIcon:{
  marginRight:3,
  marginBottom:2
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  deliveryText: {
    fontSize: fontSizes.FONT15,
    color: appColors.font,
      fontFamily:fonts.InterSemiBold,
    marginLeft: 6,
  },
  dash:{
    color:"#888",
    fontFamily:fonts.InterRegular
  },

  // 🔹 New dashed line style
  dashedLine: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    marginVertical: 6,
    marginBottom:3
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingBadge: {
    borderRadius: 20,
    paddingHorizontal: 5,
    flexDirection:"row"
  },
  iconStyle:{
    paddingLeft:2
  },
  ratingBadgeText: {
    color: appColors.font,
     fontFamily:fonts.InterSemiBold,
    fontSize: fontSizes.FONT14,
    marginHorizontal:4,
    marginRight:5,
   
  },
  ratingsCount: {
    color: '#baacacff',
    fontSize: fontSizes.FONT14,
    marginLeft: 8,
      fontFamily:fonts.InterRegular,
  },
});

