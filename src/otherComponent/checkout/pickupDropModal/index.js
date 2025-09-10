import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";

const PickupDropModal = ({ type, visible, onClose, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState("22");
  const [selectedTime, setSelectedTime] = useState(type === "pickup" ? "10:00 AM" : "04:00 PM");

  const dates = [
    { id: "1", day: "22", weekDay: "Mon", fullDate: "22 Jun" },
    { id: "2", day: "23", weekDay: "Tue", fullDate: "23 Jun" },
    { id: "3", day: "24", weekDay: "Wed", fullDate: "24 Jun" },
    { id: "4", day: "25", weekDay: "Thu", fullDate: "25 Jun" }
  ];

  const times = type === "pickup" ? [
    { id: "1", time: "10:00 AM" },
    { id: "2", time: "11:00 AM" },
    { id: "3", time: "12:00 PM" }
  ] : [
    { id: "1", time: "04:00 PM" },
    { id: "2", time: "05:00 PM" },
    { id: "3", time: "06:00 PM" }
  ];

  const handleConfirm = () => {
    const selectedDateObj = dates.find(date => date.day === selectedDate);
    onSelect(selectedDateObj.fullDate, selectedTime);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Select {type === "pickup" ? "Pickup" : "Drop"} time
            </Text>
            <TouchableOpacity onPress={handleCancel}>
              <Icon name="close" size={24} color={appColors.gray} />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalSubtitle}>Select {type === "pickup" ? "Pickup" : "Drop"} date</Text>
          <FlatList
            data={dates}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dateItem,
                  selectedDate === item.day && styles.dateItemSelected
                ]}
                onPress={() => setSelectedDate(item.day)}
              >
                <Text
                  style={[
                    styles.dateDay,
                    selectedDate === item.day && styles.textSelected
                  ]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.dateWeekDay,
                    selectedDate === item.day && styles.textSelected
                  ]}
                >
                  {item.weekDay}
                </Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />

          <Text style={styles.modalSubtitle}>Select {type === "pickup" ? "Pickup" : "Drop"} Time</Text>
          <View style={styles.timeContainer}>
            {times.map((time) => (
              <TouchableOpacity
                key={time.id}
                style={[
                  styles.timeItem,
                  selectedTime === time.time && styles.timeItemSelected
                ]}
                onPress={() => setSelectedTime(time.time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time.time && styles.textSelected
                  ]}
                >
                  {time.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: appColors.text
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: fonts.medium,
    marginVertical: 12,
    color: appColors.text
  },
  dateItem: {
    alignItems: 'center',
    padding: 16,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    width: 70,
    borderWidth: 1,
    borderColor: '#e9ecef'
  },
  dateItemSelected: {
    backgroundColor: appColors.primary,
    borderColor: appColors.primary
  },
  dateDay: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: appColors.text
  },
  dateWeekDay: {
    fontSize: 12,
    color: appColors.gray,
    marginTop: 4
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  timeItem: {
    width: '30%',
    alignItems: 'center',
    padding: 12,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef'
  },
  timeItemSelected: {
    backgroundColor: appColors.primary,
    borderColor: appColors.primary
  },
  timeText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: appColors.text
  },
  textSelected: {
    color: '#fff'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: appColors.border
  },
  cancelButtonText: {
    color: appColors.text,
    fontFamily: fonts.medium,
    fontSize: 16
  },
  confirmButton: {
    flex: 1,
    backgroundColor: appColors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 12
  },
  confirmButtonText: {
    color: '#fff',
    fontFamily: fonts.semiBold,
    fontSize: 16
  }
});

export default PickupDropModal;