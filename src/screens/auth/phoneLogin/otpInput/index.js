import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const OtpInput = ({ code = '', setCode = () => { }, maxLength = 4 }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef();
  const navigation = useNavigation();
  const boxArray = new Array(maxLength).fill(0);

  const handlePress = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const handleChange = text => {
    setCode(text.replace(/[^0-9]/g, ''));
  };

  const renderBoxes = () =>
  boxArray.map((_, index) => {
    const digit = code[index] || '';
    const isFilled = index < code.length;
    const isCurrent =
      isFocused &&
      (index === code.length || (code.length === maxLength && index === maxLength - 1));

    return (
      <View
        key={index}
        style={[
          styles.box,
          isCurrent && styles.focusedBox,
          isFilled && styles.filledBox,
        ]}
      >
        <Text style={styles.boxText}>{digit}</Text>
      </View>
    );
  });


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.reset({
                index: 0,
                routes: [{ name: 'PhoneLogin' }],
              });
            }
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.boxesContainer} onTouchStart={handlePress}>
          {renderBoxes()}
        </View>
        <TextInput
          ref={inputRef}
          style={styles.hiddenInput}
          value={code}
          onChangeText={handleChange}
          keyboardType="number-pad"
          maxLength={maxLength}
          autoFocus
          caretHidden
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OtpInput;
