import { View, Text, Image, StyleSheet } from 'react-native';
import fonts from '../../theme/appFonts';
import appColors from '../../theme/appColors';
import { fontSizes } from '../../theme/appConstant';

const AuthHeader = ({ title, subtitle }) => {
  return (
    <View style={styles.header}>
      <Image 
        tintColor={appColors.blue} 
        source={require('../../assets/images/logo.png')} 
        style={styles.logo} 
        resizeMode="contain" 
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop:20
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: fontSizes.FONT29,
    fontFamily: fonts.PoppinsBold,
    color: appColors.font,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    color: appColors.subTitle,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default AuthHeader;