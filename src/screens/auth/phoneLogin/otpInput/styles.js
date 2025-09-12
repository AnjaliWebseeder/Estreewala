import { StyleSheet } from 'react-native';
import appColors from '../../../../theme/appColors'
import fonts from '../../../../theme/appFonts'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  box: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  focusedBox: {
    borderColor: appColors.blue,
    backgroundColor: '#fff',
    shadowColor: appColors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  filledBox: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  boxText: {
    fontSize: 20,
    fontFamily: fonts.InterSemiBold,
    color: '#333',
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    fontSize: 1,
  },
});