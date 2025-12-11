import { StyleSheet } from "react-native";
import { windowHeight } from "../../../../theme/appConstant";
import appColors from "../../../../theme/appColors";
import fonts from "../../../../theme/appFonts";

export const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: appColors.darkBlue,
    backgroundColor: appColors.card,
    marginBottom: windowHeight(10),
    paddingBottom: windowHeight(10),
    paddingTop: 10,
    borderWidth: 1,
    borderColor: appColors.darkBlue,
    marginHorizontal: 15,
    borderRadius: 10,
    position: 'relative',
  },
  categoryBadge: {
    fontSize: 10,
    color: '#666',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8
  },
  instructionContainer: {
    marginTop: 7,
    borderRadius: 6,
  },
  instructionText: {
    fontSize: 10,
    color: appColors.font,
    fontStyle: 'italic',
    fontFamily: fonts.InterSemiBold,
    marginLeft: 4
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 4,
    paddingTop: 6,
    marginBottom: 1,
  },
  serviceRowProcessing: {
    opacity: 0.7, // Reduced opacity while processing
  },
  serviceInfoContainer: {
    flex: 1,
  },
  serviceInfo: {
    backgroundColor: '#D4EDDA',
    borderColor: '#C3E6CB',
    borderRadius: 10,
    marginRight: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderWidth: 1,
     marginBottom:2,
         
  },
  serviceName: {
    fontSize: 11,
    flexShrink: 1,
    color: '#155724',
    fontWeight: '600',
    paddingHorizontal: 2,

   
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: windowHeight(12),
    resizeMode: "contain",
    marginLeft: 15
  },
  info: { 
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: appColors.font,
    fontFamily: fonts.InterMedium,
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
    color: "#7B7F86",
    fontFamily: fonts.InterRegular,
    flexDirection: "row",
    alignItems: "center",
    right: windowHeight(5),
  },
  right: {
    width: 0,
    justifyContent: 'center',
  },
  counter: {
    backgroundColor: appColors.blue,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: windowHeight(2),
    flexDirection: "row",
    alignItems: "center",
    right: windowHeight(10)
  },
  qty: {
    color: "#fff",
    marginHorizontal: 8,
    fontWeight: "700",
    minWidth: 18,
    textAlign: "center",
  },
  servicePrice: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
    fontFamily: fonts.InterMedium,
    marginLeft: 6
  },
  serviceCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.darkBlue,
    borderRadius: 6,
    padding: 2,
  },
  counterButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  serviceQty: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    marginHorizontal: 6,
    minWidth: 20,
    textAlign: 'center',
  },
  removeServiceButton: {
    backgroundColor: '#FF4444',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  removeServiceText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 16,
    includeFontPadding: false,
  },
  itemTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 13,
    color: '#333',
    fontFamily: fonts.InterSemiBold,
  },
  totalPrice: {
    fontSize: 14,
    fontFamily: fonts.InterBold,
    color: appColors.darkBlue,
  },
});