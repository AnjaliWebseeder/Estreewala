import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import fonts from "../../theme/appFonts";
import appColors from "../../theme/appColors";
import { windowHeight } from "../../theme/appConstant";

const Header = ({ title, onBackPress, onRightPress, showNotificationIcon,containerStyle,titleStyle,iconColor}) => {
  return (
    <View style={[styles.header,{...containerStyle}]}>
      {/* Back button */}
    <TouchableOpacity style={styles.arrowView} onPress={onBackPress}>
        <Icon name="chevron-back" size={16} color={iconColor ? iconColor : appColors.black} />
      </TouchableOpacity>

      {/* Centered title */}
      <Text style={[styles.headerTitle,{...titleStyle}]}>{title}</Text>

      {/* Right icon or empty space */}
      {showNotificationIcon ? (
        <TouchableOpacity style={styles.rightIcon} onPress={onRightPress}>
          <Icon name="settings-outline" size={22} color="#333" />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightIcon} /> // empty space for alignment
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: windowHeight(12),
    paddingTop: windowHeight(17),
    position: "relative",
  },
  arrowView: {
    borderRadius: 20,
    borderColor: appColors.border,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
  },
  headerTitle: {
    // position: "absolute",
    left: 0,
    right: 0,
    fontSize: 18,
    fontFamily: fonts.InterMedium,
    color: appColors.font,
    lineHeight:23
  },
  rightIcon: {
    width: 35, // same width as back button for symmetry
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
