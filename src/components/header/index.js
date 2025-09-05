import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import fonts from "../../theme/appFonts";
import appColors from "../../theme/appColors";

const Header = ({ title, onBackPress, onRightPress,showNotificationIcon }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={{left:1}} onPress={onBackPress}>
        <Icon name="arrow-back" size={22} color="#333" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>
{showNotificationIcon &&  <TouchableOpacity style={{right:6}} onPress={onRightPress}>
        <Icon name="settings-outline" size={22} color="#333" />
      </TouchableOpacity>}
    {!showNotificationIcon &&   <View/>}
      
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingTop:27
  },
  headerTitle: {
    fontSize: 18,
    fontFamily:fonts.PoppinsMedium,
    color:appColors.font
  },
});

export default Header;
