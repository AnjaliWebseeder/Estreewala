import { StyleSheet } from "react-native";
import { windowHeight } from "../../theme/appConstant";
import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";

export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal:windowHeight(13),
    
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.menuCard,
    borderRadius: 10,
    paddingHorizontal: 13,
    height: 47,
    borderWidth: 1,
    borderColor: appColors.border,
    height:windowHeight(34)

  },
  searchIcon: {
    marginRight: 5,
    
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: appColors.font,
     fontFamily:fonts.InterRegular
  },
  filterButton: {
    width: windowHeight(32),
    height: windowHeight(32),
    borderRadius: windowHeight(6),
    backgroundColor: appColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});