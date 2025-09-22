import appColors from "../../../theme/appColors";
import { windowHeight } from "../../../theme/appConstant";
import fonts from "../../../theme/appFonts";

const { StyleSheet,Dimensions } = require("react-native");

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor:appColors.background,
  },
  placeholder: {
    width: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  mapContainer: { 
    width: "100%", 
    height: height * 0.5,
    position: 'relative',
  },
  map: { 
    flex: 1 
  },
  mapLoadingContainer: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#F8F8F8",
  },
  mapLoadingText: { 
    marginTop: 8, 
    color: "#FF7E00", 
    fontSize: 14 
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  formContainer: { 
    flex: 1, 
    padding: 16,
 
  },
  savedAddressesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color:appColors.font,
    fontFamily:fonts.InterSemiBold,
    marginBottom: windowHeight(8)
  },
  savedAddressesToggle: {
    color: appColors.blue,
    fontSize: 12,
   
  },
  savedAddressesContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  savedAddressesTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#666',
  },
  savedAddressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  savedAddressTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  savedAddressType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  savedAddressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  fieldContainer: { 
    marginBottom: 16,
    position: 'relative',
  },
  label: { 
    fontSize: 14, 
    fontFamily:fonts.InterMedium,
    color:appColors.font, 
    marginBottom: windowHeight(7)
  },
  input: {
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 8, 
    padding: 12, 
    backgroundColor: "#fff", 
    fontSize: 14,
    fontFamily:fonts.InterRegular,
    lineHeight:25,
    color:appColors.font
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  inputWithIcon: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 4,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: appColors.blue,
  },
  radioText: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: appColors.blue, 
    padding: 16, 
    borderRadius: 8, 
    marginTop: 20, 
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: 16 
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  fullScreenMap: {
    flex: 1,
  },
  confirmLocationButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: appColors.blue,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});