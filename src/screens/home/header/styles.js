import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { StyleSheet } from 'react-native';
import { fontSizes, windowHeight, windowWidth } from '../../../theme/appConstant';

export const styles = StyleSheet.create({
  header: {
    marginTop: windowHeight(10),
    marginBottom: windowHeight(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: windowWidth(6),
    paddingTop: 15
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginHorizontal: 8
  },
  title: {
    flex: 1,
    fontSize: fontSizes.FONT24,
    lineHeight: windowHeight(22),
    fontFamily: fonts.InterMedium,
    color: appColors.white,
    paddingHorizontal: 16,
    opacity: 0.9
  },
  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: appColors.white,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -4,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    flex: 1,
  },

  addressTitle: {
    color: "#fff",
    fontSize: 13,
    fontFamily: fonts.InterSemiBold,
  },

  addressSub: {
    color: "#d0d0d0",
    fontSize: 11,
    fontFamily: fonts.InterRegular,
  },
});
