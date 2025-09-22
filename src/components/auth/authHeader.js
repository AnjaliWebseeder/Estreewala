import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import fonts from '../../theme/appFonts';
import appColors from '../../theme/appColors';
import { fontSizes, windowHeight } from '../../theme/appConstant';
import { loginImage } from '../../utils/images/images';

const { width } = Dimensions.get("window");

const AuthHeader = ({ title, subtitle }) => {
  return (
    <View>
      {/* Full width top image */}
      <View style={styles.bannerContainer}>
        <Image 
          source={loginImage} 
          style={styles.banner} 
          resizeMode="cover"
        />
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
    marginHorizontal: 20,
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
    marginTop: 8,
    paddingHorizontal: 20,
    marginBottom:windowHeight(15)
  },
});

export default AuthHeader;
