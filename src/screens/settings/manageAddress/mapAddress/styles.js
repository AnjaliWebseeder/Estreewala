import { StyleSheet, Dimensions } from 'react-native';
import appColors from "../../../../theme/appColors"

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  // Increased map height to 60% of screen
  mapContainer: {
    height: height * 0.6, // Changed from 0.4 to 0.6 (60% of screen)
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  loadingText: {
    marginTop: 10,
    color: appColors.darkBlue,
    fontSize: 14,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: appColors.white,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: appColors.darkBlue,
    marginBottom: 16,
  },
  selectedAddressContainer: {
    backgroundColor: appColors.lightGray,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedAddressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: appColors.darkGray,
    marginBottom: 4,
  },
  selectedAddressText: {
    fontSize: 14,
    color: appColors.darkBlue,
    lineHeight: 18,
  },
  coordinatesText: {
    fontSize: 12,
    color: appColors.gray,
    marginTop: 4,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: appColors.darkGray,
    marginBottom: 8,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressTypeOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: appColors.lightGray,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  addressTypeOptionSelected: {
    backgroundColor: appColors.blue,
  },
  addressTypeText: {
    fontSize: 14,
    color: appColors.darkGray,
    fontWeight: '500',
  },
  addressTypeTextSelected: {
    color: appColors.white,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: appColors.gray,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: appColors.blue,
    borderColor: appColors.blue,
  },
  checkboxText: {
    fontSize: 14,
    color: appColors.darkGray,
  },
  saveButton: {
    backgroundColor: appColors.blue,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  saveButtonDisabled: {
    backgroundColor: appColors.lightGray,
  },
  saveButtonText: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  geocodingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  geocodingText: {
    fontSize: 12,
    color: appColors.blue,
    marginLeft: 8,
  },
});