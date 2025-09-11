import { View, Text, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

const ConfirmationModal = ({ visible, onClose, onConfirm, title, message }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType={"fade"}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Icon name="warning" size={24} color="#e53935" />
              <Text style={styles.modalTitle}>{title}</Text>
            </View>
            
            <Text style={styles.modalMessage}>{message}</Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]} 
                onPress={onConfirm}
              >
                <Text style={styles.confirmButtonText}>Delete All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ConfirmationModal;