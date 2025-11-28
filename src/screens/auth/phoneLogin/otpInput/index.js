import React, { useState, useRef } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar
} from 'react-native';
import { styles } from './styles';

const OtpInput = ({ code, setCode, maxLength }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef();
  const boxArray = new Array(maxLength).fill(0);

  const handlePress = () => {
    setIsFocused(true);
    inputRef.current.focus();
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (text) => {
    setCode(text.replace(/[^0-9]/g, ''));
  };

  const renderBoxes = () => {
    return boxArray.map((_, index) => {
      const digit = code[index] || '';
      const isCurrent = index === code.length;
      const isFilled = index < code.length;
      
      return (
        <View 
          key={index} 
          style={[
            styles.box, 
            isFocused && isCurrent && styles.focusedBox,
            isFilled && styles.filledBox
          ]}
        >
          <Text style={styles.boxText}>{digit}</Text>
        </View>
      );
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.boxesContainer} onTouchStart={handlePress}>
          {renderBoxes()}
        </View>
        <TextInput
          ref={inputRef}
          style={styles.hiddenInput}
          value={code}
          onChangeText={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          keyboardType="number-pad"
          maxLength={maxLength}
          autoFocus={true}
          caretHidden={true}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OtpInput;