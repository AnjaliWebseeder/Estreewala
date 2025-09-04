const { StyleSheet } = require("react-native");
import appColors from "../../theme/appColors";
import { windowHeight } from "../../theme/appConstant";

export const styles = StyleSheet.create({
  minimalTabBar: {
    backgroundColor: appColors.white,
    borderTopWidth: 1,
    borderTopColor: appColors.lightBorder,
    height: 78,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    paddingHorizontal: 5,
    alignItems:"center",
    justifyContent:"center",
    borderTopLeftRadius:25,
    borderTopRightRadius:25
  },
  minimalTabButton: {
     height: '60%',

  },
  minimalIconContainer: {
    padding: 8,
    borderRadius: 30,
    
  },
  minimalIconContainerActive: {
    backgroundColor: appColors.blue,
    marginBottom:3
  },
  minimalTabLabel: {
    fontSize: 11,
    letterSpacing: 0.2,
   
    
  },
});