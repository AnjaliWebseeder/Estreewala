import { StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../theme/appConstant";
import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";

export const styles = StyleSheet.create({
  searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,                     
  paddingHorizontal: windowWidth(13),  
},
 searchInputContainer: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: appColors.menuCard,
  borderRadius: 10,
  paddingHorizontal: 10,
  height: windowHeight(30),             // ✅ FIXED HEIGHT
  borderWidth: 1,
  borderColor: appColors.border,
},
  searchIcon: {
    marginRight: 5,
    
  },
 searchInput: {
  flex: 1,
  fontSize: 14,
  color: appColors.font,
  fontFamily: fonts.InterRegular,
  paddingVertical: 0,         // ✅ VERY IMPORTANT
  height: '100%',             // ✅ match parent
},
  filterButton: {
    width: windowHeight(30),
    height: windowHeight(30),
    borderRadius: windowHeight(6),
    backgroundColor: appColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});