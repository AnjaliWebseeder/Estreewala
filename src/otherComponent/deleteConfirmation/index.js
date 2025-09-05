import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import {styles} from './styles'

const DeleteConfirmation = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Address</Text>
          <Text style={styles.modalMessage}>
            Are you sure you want to delete this address? This action cannot be undone.
          </Text>
          
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalBtn, styles.cancelBtn]}
              onPress={onClose}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalBtn, styles.deleteBtn]}
              onPress={onConfirm}
            >
              <Text style={styles.deleteBtnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};



export default DeleteConfirmation;