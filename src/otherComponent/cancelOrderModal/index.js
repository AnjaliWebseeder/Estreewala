import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import appColors from '../../theme/appColors';

const CancelOrderModal = ({
  visible,
  onClose,
  onConfirm,
  orderId,
  selectedReason,
  setSelectedReason,
  otherReason,
  setOtherReason,
  isLoading = false
}) => {

  const [errorMessage, setErrorMessage] = useState('');


  const cancellationReasons = [
    "Change of plans",
    "Found a better price",
    "Service not needed anymore",
    "Too long waiting time",
    "Other reason"
  ];

  const handleConfirm = () => {
    if (selectedReason === "Other reason") {
      if (!otherReason.trim() || otherReason.trim().length < 5) {
        setErrorMessage('Reason required: At least 5 chars, e.g., "Changed my plans"');
        return;
      }
    }
    setErrorMessage('');
    const reason = selectedReason === "Other reason" ? otherReason : selectedReason;
    onConfirm(reason);
  };

  const handleClose = () => {
    setSelectedReason('');
    setOtherReason('');
    setErrorMessage('');
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
            {/* LEFT SIDE */}
            <View style={styles.leftHeader}>
              <Icon name="cancel" size={24} color="#e53935" />

              <View style={styles.titleContainer}>
                <Text style={styles.modalTitle}>Cancel Order</Text>
                <Text style={styles.orderId}>#{orderId}</Text>
              </View>
            </View>

            {/* RIGHT SIDE */}
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
                disabled={isLoading}
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
                  onChangeText={(text) => {
                    setOtherReason(text);
                    if (text.trim().length >= 5) setErrorMessage('');
                  }}
                  multiline={true}
                  numberOfLines={3}
                  placeholderTextColor={appColors.font}
                  editable={!isLoading}
                />
                {errorMessage ? (
                  <Text style={{ color: 'red', marginTop: 5 }}>{errorMessage}</Text>
                ) : null}
              </View>
            )}
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Keep Order</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.confirmButton,
                (!selectedReason || (selectedReason === "Other reason" && otherReason.trim().length < 5) || isLoading) &&
                styles.disabledButton
              ]}
              onPress={handleConfirm}
              disabled={!selectedReason || (selectedReason === "Other reason" && otherReason.trim().length < 5) || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={appColors.white} />
              ) : (
                <Text style={[
                  styles.confirmButtonText,
                  (!selectedReason || (selectedReason === "Other reason" && otherReason.trim().length < 5) || isLoading) &&
                  { color: "#a0a0a0" } // <-- disabled text color
                ]}>
                  Cancel Order
                </Text>
              )}
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CancelOrderModal;
