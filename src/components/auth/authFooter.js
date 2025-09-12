import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import fonts from '../../theme/appFonts';
import appColors from '../../theme/appColors';

const AuthFooter = ({ text, buttonText, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: fonts.InterRegular,
    color: appColors.subTitle,
    marginRight: 4,
    fontSize: 14,
  },
  buttonText: {
    fontFamily: fonts.InterSemiBold,
    color: appColors.blue,
    fontSize: 14,
  },
});

export default AuthFooter;