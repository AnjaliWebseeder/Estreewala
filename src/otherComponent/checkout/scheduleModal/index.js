import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { modalStyles } from "../styles";
import { fontSizes, windowHeight } from "../../../theme/appConstant";
import appColors from "../../../theme/appColors";

export const ScheduleModal = ({
  visible,
  onClose,
  type,
  selectedDate,
  onDateChange,
  selectedSlot,
  onSlotSelect,
  timeSlots,
  minDate
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState('date');

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep open on iOS, close on Android
    if (date) {
      onDateChange(date);
    }
  };

  const showDatepicker = (mode) => {
    setDatePickerMode(mode);
    setShowDatePicker(true);
  };

  const handleSlotSelect = slot => {
    onSlotSelect(slot);   // ✅ parent me state set
    onClose();            // ✅ modal close
  };

  return (
    <Modal visible={visible} animationType={"none"} transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={modalStyles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={modalStyles.modalContent}>
              <View style={[modalStyles.modalHeader, { marginBottom: 10 }]}>
                <Text style={modalStyles.modalTitle}>
                  {type === 'pickup' ? 'Schedule Pickup' : 'Schedule Delivery'}
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <Icon name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              {/* Date Selection */}
              <View style={modalStyles.dateSection}>
                <Text style={[modalStyles.sectionTitle, { marginBottom: windowHeight(7), fontSize: fontSizes.FONT17 }]}>Select Date</Text>
                <TouchableOpacity
                  style={modalStyles.dateButton}
                  onPress={() => showDatepicker('date')}
                >
                  <Icon name="calendar-outline" size={19} color={appColors.blue} />
                  <Text style={modalStyles.dateButtonText}>
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Text>
                  <Icon name="chevron-forward" size={13} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Time Slots */}
              <View style={modalStyles.slotsSection}>
                <Text style={[modalStyles.sectionTitle, { fontSize: fontSizes.FONT17, marginBottom: windowHeight(7) }]}>Available Time Slots</Text>
                <FlatList
                  data={timeSlots}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        modalStyles.timeSlot,
                        selectedSlot?.id === item.id && modalStyles.timeSlotSelected
                      ]}
                      onPress={() => handleSlotSelect(item)}
                    >
                      <Text style={[
                        modalStyles.timeSlotText,
                        selectedSlot?.id === item.id && modalStyles.timeSlotTextSelected
                      ]}>
                        {item.time}
                      </Text>

                    </TouchableOpacity>
                  )}
                  numColumns={2}
                  columnWrapperStyle={modalStyles.slotsGrid}
                />
              </View>

              {/* Confirm Button */}
              <TouchableOpacity
                style={[
                  modalStyles.confirmButton,
                  !selectedSlot && modalStyles.confirmButtonDisabled
                ]}
                onPress={onClose}
                disabled={!selectedSlot}
              >
                <Text style={modalStyles.confirmButtonText}>
                  Confirm {type === 'pickup' ? 'Pickup' : 'Delivery'}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode={datePickerMode}
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={minDate}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};