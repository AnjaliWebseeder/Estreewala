import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import appColors from '../../../theme/appColors';
import fonts from '../../../theme/appFonts';

const PaymentModal = ({ visible, onClose = () => {}, paymentMethods = [], onSelect = () => {} }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!visible) setSelected(null);
  }, [visible]);

  const handleConfirm = () => {
    if (!selected) {
      // you could show alert
      onClose();
      return;
    }
    onSelect(selected);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.handle} />
          <Text style={styles.modalTitle}>Select Payment method</Text>

          <FlatList
            data={paymentMethods}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.paymentItem} onPress={() => setSelected(item)}>
                <View style={[styles.radio, selected?.id === item.id && styles.radioSelectedOuter]}>
                  {selected?.id === item.id && <View style={styles.radioSelected} />}
                </View>
                <Text style={styles.paymentText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#f0f0f0' }} />}
          />

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.45)' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 18 },
  handle: { width: 60, height: 6, backgroundColor: '#E9EDF7', borderRadius: 6, alignSelf: 'center', marginBottom: 10 },
  modalTitle: { fontSize: 16, fontFamily: fonts.semiBold, textAlign: 'center', marginBottom: 10 },
  paymentItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  radio: { height: 22, width: 22, borderRadius: 12, borderWidth: 2, borderColor: appColors.border, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  radioSelectedOuter: { borderColor: appColors.primary },
  radioSelected: { height: 12, width: 12, borderRadius: 8, backgroundColor: appColors.primary },
  paymentText: { fontSize: 16 },
  confirmButton: { backgroundColor: appColors.primary, padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  confirmButtonText: { color: '#fff', fontWeight: '700' },
});

export default PaymentModal;
