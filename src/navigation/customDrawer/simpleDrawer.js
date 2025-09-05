import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Animated 
} from 'react-native';

const { width } = Dimensions.get('window');

const SimpleDrawer = ({ isOpen, onClose, children }) => {
  const drawerAnim = useRef(new Animated.Value(-width * 0.8)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(drawerAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(drawerAnim, {
          toValue: -width * 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isOpen]);

  const overlayOpacity = overlayAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5]
  });

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Overlay that covers entire screen */}
        <Animated.View 
          style={[
            styles.overlay, 
            { opacity: overlayOpacity }
          ]}
        >
          <TouchableOpacity 
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            activeOpacity={1}
          />
        </Animated.View>
        
        {/* Drawer on top of overlay */}
        <Animated.View 
          style={[
            styles.drawer, 
            { 
              transform: [{ translateX: drawerAnim }] 
            }
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: 'white',
    zIndex: 2, // Drawer above overlay
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, // Overlay behind drawer
  },
});

export default SimpleDrawer;