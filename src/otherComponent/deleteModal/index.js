import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { styles } from "./styles";

const DELETE_DELAY = 10; // seconds

const DeleteAccountModal = ({
  visible,
  onCancel,
  onConfirm,
  isDeleting,
}) => {
  const [scaleAnim] = useState(new Animated.Value(0));
  const [countdown, setCountdown] = useState(DELETE_DELAY);

  // Animation
  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();

      setCountdown(DELETE_DELAY); // reset timer on open
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  // Countdown logic
  useEffect(() => {
    if (!visible) return;

    if (countdown === 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [visible, countdown]);

  const isDeleteDisabled = countdown > 0 || isDeleting;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContainerInstagram,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          {/* Title */}
          <View style={styles.titleSection}>
            <Text style={styles.modalTitleInstagram}>Delete Account</Text>
          </View>

          {/* Message */}
          <View style={styles.messageSection}>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete your account? This action cannot
              be undone and all your data will be permanently lost.
            </Text>

            {/* {countdown > 0 && (
              <Text style={styles.timerText}>
                You can delete your account in {countdown}s
              </Text>
            )} */}
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            {/* Delete Button */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.destructiveButton,
                isDeleteDisabled && styles.disabledButton,
              ]}
              onPress={onConfirm}
              disabled={isDeleteDisabled}
            >
              {isDeleting ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.destructiveButtonText}>
                    Deleting...
                  </Text>
                </View>
              ) : (
                <Text style={styles.destructiveButtonText}>
                  {countdown > 0
                    ? `Delete Account (${countdown}s)`
                    : "Delete Account"}
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.separator} />

            {/* Cancel */}
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButtonInstagram]}
              onPress={onCancel}
              disabled={isDeleting}
            >
              <Text style={styles.cancelButtonTextInstagram}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;
