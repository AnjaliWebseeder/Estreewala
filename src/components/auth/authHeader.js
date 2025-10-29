import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import fonts from '../../theme/appFonts';
import { fontSizes, windowHeight } from '../../theme/appConstant';
import { loginImage } from '../../utils/images/images';
import Icon from 'react-native-vector-icons/Ionicons';
import appColors from '../../theme/appColors';

const { width } = Dimensions.get("window");

const AuthHeader = ({ title, subtitle ,bannerStyle,showBackButton,onBackPress}) => {
  return (
    <View>
      {/* Full width top image */}
      <View style={[styles.bannerContainer,{...bannerStyle}]}>
        <Image 
          source={loginImage} 
          style={styles.banner} 
          resizeMode="cover"
        />

          {showBackButton && onBackPress && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Icon name="chevron-back" size={16} color={appColors.black} />
        </TouchableOpacity>
      )}
      </View>

      {/* Title with gray lines */}
      <View style={styles.titleWrapper}>
        <View style={styles.line} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
      </View>

      {/* Subtitle */}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: width,
    height: windowHeight(300),
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 0,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc", // light gray line
    marginHorizontal: 10,
  },
  title: {
    fontSize: fontSizes.FONT22,
    fontFamily: fonts.InterSemiBold,
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: fontSizes.FONT16,
    fontFamily: fonts.InterRegular,
    color: "#666",
    textAlign: "center",
    marginTop: 2,
    paddingHorizontal: 20,
    marginBottom:windowHeight(15)
  },
    backButton: {
    position: "absolute",
    top: windowHeight(15),
    left: windowHeight(15),
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    height: windowHeight(25),
    width: windowHeight(25),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthHeader;
