import React, { useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { styles } from './styles';
import appColors from '../../../../theme/appColors';

const OtpInputRN = ({ code, setCode }) => {
  const otpRef = useRef(null);

  return (
    <View style={styles.otpContainer}>
      <OTPTextInput
        ref={otpRef}
        inputCount={4}
        tintColor={appColors.primary} // focused border color
        offTintColor="#e6e6e6"       // default border color
        textInputStyle={styles.otpBoxText}
        handleTextChange={setCode}
        keyboardType="number-pad"
        containerStyle={styles.otpBoxesContainer}
      />
    </View>
  );
};

export default OtpInputRN;
