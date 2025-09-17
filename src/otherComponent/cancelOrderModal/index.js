import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView , TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import appColors from '../../theme/appColors';

const CancelOrderModal = ({ visible, onClose, onConfirm, orderId }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const cancellationReasons = [
    "Change of plans",
    "Found a better price",
    "Service not needed anymore",
    "Too long waiting time",
    "Other reason"
  ];

  const handleConfirm = () => {
    const reason = selectedReason === "Other reason" ? otherReason : selectedReason;
    onConfirm(reason);
    setSelectedReason('');
    setOtherReason('');
  };

  const handleClose = () => {
    setSelectedReason('');
    setOtherReason('');
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType={"none"}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={handleClose}
        />
        
        <View style={styles.bottomModalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Icon name="cancel" size={24} color="#e53935" />
            <Text style={styles.modalTitle}>Cancel Order #{orderId}</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={appColors.font} />
            </TouchableOpacity>
          </View>

          {/* Reason Selection */}
          <ScrollView style={styles.reasonsContainer}>
            <Text style={styles.reasonTitle}>Select a reason for cancellation</Text>
            
            {cancellationReasons.map((reason, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.reasonOption,
                  selectedReason === reason && styles.selectedReasonOption
                ]}
                onPress={() => setSelectedReason(reason)}
              >
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioOuter,
                    selectedReason === reason && styles.radioOuterSelected
                  ]}>
                    {selectedReason === reason && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </View>
                <Text style={styles.reasonText}>{reason}</Text>
              </TouchableOpacity>
            ))}

            {/* Other Reason Input */}
            {selectedReason === "Other reason" && (
              <View style={styles.otherReasonContainer}>
                <Text style={styles.otherReasonLabel}>Please specify</Text>
                <TextInput
                  style={styles.otherReasonInput}
                  placeholder="Enter your reason..."
                  value={otherReason}
                  onChangeText={setOtherReason}
                  multiline={true}
                  numberOfLines={3}
                />
              </View>
            )}
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]} 
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Keep Order</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.modalButton, 
                styles.confirmButton,
                (!selectedReason || (selectedReason === "Other reason" && !otherReason.trim())) && 
                styles.disabledButton
              ]} 
              onPress={handleConfirm}
              disabled={!selectedReason || (selectedReason === "Other reason" && !otherReason.trim())}
            >
              <Text style={[styles.confirmButtonText,{color: selectedReason ?  appColors.white : "gray"}]}>Cancel Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CancelOrderModal;