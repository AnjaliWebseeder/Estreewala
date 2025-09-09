import { StyleSheet } from "react-native";
import { windowHeight } from "../../theme/appConstant";
import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";

export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal:windowHeight(13)
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 13,
    height: 47,
    borderWidth: 1,
    borderColor: '#e9ecef',

  },
  searchIcon: {
    marginRight: 5,
    
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: appColors.font,
     fontFamily:fonts.PoppinsRegular
  },
  filterButton: {
    width: windowHeight(35),
    height: windowHeight(35),
    borderRadius: windowHeight(6),
    backgroundColor: appColors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
});