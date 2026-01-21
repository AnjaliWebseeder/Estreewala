import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import fonts from "../../theme/appFonts";
import appColors from "../../theme/appColors";
import { windowHeight } from "../../theme/appConstant";

const Header = ({
  title,
  onBackPress,
  containerStyle,
  titleStyle,
  iconColor,
}) => {
  return (
    <View style={[styles.header, containerStyle]}>
      <TouchableOpacity
        onPress={onBackPress}
        activeOpacity={0.6}
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        style={styles.arrowView}
      >
        <Icon
          name="chevron-back"
          size={18}
          color={iconColor || appColors.black}
        />
      </TouchableOpacity>

      <Text
        pointerEvents="none"
        style={[styles.headerTitle, titleStyle]}
      >
        {title}
      </Text>

      <View style={styles.rightIcon} />
    </View>
  );
};

export default Header;

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
    zIndex: 2,
    borderRadius: 20,
    borderColor: appColors.border,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.InterMedium,
    color: appColors.font,
    lineHeight: 23,
  },
  rightIcon: {
    width: 35,
    height: 35,
  },
});

