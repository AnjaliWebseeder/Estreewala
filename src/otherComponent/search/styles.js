import { StyleSheet } from "react-native";
import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:appColors.white,
  },
  searchContainer: {
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom:18
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: appColors.font,
    fontFamily:fonts.InterRegular,
    marginTop:2

  },
  popularSection: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
   fontFamily:fonts.InterMedium,
    color: appColors.font,

    marginBottom: 8,
  },
  popularTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 3,
  },
  popularTag: {
    backgroundColor:appColors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  popularTagText: {
    color: appColors.blue,
    fontSize: 12.6,
    fontFamily:fonts.InterMedium,
  },
  recentSearches: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecentText: {
    color: appColors.font,
    fontSize: 14,
        fontFamily:fonts.InterRegular,
  },
  resultsContainer: {
    flex: 1,
  },
  
  resultsList: {
    padding: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    backgroundColor:appColors.white,
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  serviceContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 16,
  fontFamily:fonts.InterMedium,
    color: appColors.font,

    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.lightBlue,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
  fontFamily:fonts.InterMedium,
    color: appColors.font,
   marginTop:2,
    marginLeft: 4,
  },
  servicesContainer: {
    marginBottom: 0,
  },
  servicesText: {
    fontSize: 12,
    color: appColors.subTitle,
      fontFamily:fonts.InterRegular,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 12,
    color: appColors.subTitle,
    marginLeft: 8,
      fontFamily:fonts.InterRegular,
      marginTop:2.5
     
  },
  priceText: {
    fontSize: 13,
  fontFamily:fonts.InterMedium,
    color: appColors.blue,
    marginTop:7
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: 18,
  fontFamily:fonts.InterMedium,
    color: appColors.subTitle,
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubText: {
    fontSize: 14,
    color: appColors.font,
    textAlign: 'center',
  },
});