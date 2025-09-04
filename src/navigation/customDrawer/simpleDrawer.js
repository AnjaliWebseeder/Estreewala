import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const SimpleDrawer = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={styles.drawer}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    width: 280,
    backgroundColor: 'white',
  },
});

export default SimpleDrawer;