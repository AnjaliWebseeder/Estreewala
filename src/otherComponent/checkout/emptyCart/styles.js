import { StyleSheet } from 'react-native';
import { windowHeight } from '../../../theme/appConstant';
import { fontSizes } from '../../../theme/appConstant';
import fonts from '../../../theme/appFonts'
import appColors from "../../../theme/appColors";

export const styles = StyleSheet.create({
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 50,
  },
  emptyCartText: {
    fontSize: fontSizes.FONT18,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    fontFamily: fonts.InterMedium
  },
  browseButton: {
    backgroundColor: appColors.blue,
    paddingHorizontal: 20,
    paddingVertical: windowHeight(12),
    borderRadius: 10,
    marginTop: 16,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: fontSizes.FONT16,
    fontFamily: fonts.InterMedium
  },
});