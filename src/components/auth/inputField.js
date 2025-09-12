import { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';  // ✅ use RN vector icons
import fonts from '../../theme/appFonts';
import appColors from '../../theme/appColors';
import { fontSizes } from '../../theme/appConstant';

const InputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      {/* Left Icon */}
      {icon && (
        <Ionicons 
          name={icon} 
          size={20} 
          color={appColors.subTitle} 
          style={styles.inputIcon} 
        />
      )}

      {/* Text Input */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={appColors.subTitle}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !showPassword}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />

      {/* Password Toggle Icon */}
      {secureTextEntry && (
        <TouchableOpacity 
          onPress={() => setShowPassword(!showPassword)} 
          style={styles.eyeIcon}
        >
          <Ionicons 
            name={showPassword ? "eye-outline" : "eye-off-outline"} 
            size={20} 
            color={appColors.subTitle} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.lightGray,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 16,
    height: 56,
      borderColor: appColors.blue,
    backgroundColor: appColors.white,
    shadowColor: appColors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    borderWidth:0.1
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: fonts.InterRegular,
    color: appColors.font,
    fontSize: fontSizes.FONT16HALF,
    marginTop:3,
  },
  eyeIcon: {
    padding: 4,
  },
});

export default InputField;
