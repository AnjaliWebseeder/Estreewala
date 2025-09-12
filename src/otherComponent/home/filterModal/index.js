import { View, Text, Modal, TouchableOpacity } from 'react-native'
import Slider from '@react-native-community/slider';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import appColors from '../../../theme/appColors';

export default function FilterModal ({ visible, onClose, onApplyFilters }) {
  const [rating, setRating] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [distance, setDistance] = useState(5); // Default to 5 km
  const [tempDistance, setTempDistance] = useState(5); // Temporary value for slider

  const applyFilters = () => {
    // setDistance(tempDistance); // Set the final distance when applying
    // onApplyFilters({ rating, deliveryTime, distance: tempDistance });
    onClose();
  };

  const resetFilters = () => {
    setRating(0);
    setDeliveryTime('');
    setTempDistance(5);
    setDistance(5);
  };

  const formatDistance = (value) => {
    if (value === 0) return 'Any distance';
    if (value === 10) return '10+ km';
    return `${value} km`;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel,{marginBottom:4}]}>Minimum Rating</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                >
                  <Ionicons
                    name={star <= rating ? "star" : "star-outline"}
                    size={20}
                    color="#FFD700"
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel,{marginBottom:6}]}>
              Maximum Distance: {formatDistance(tempDistance)}
            </Text>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={1}
                value={tempDistance}
                onValueChange={setTempDistance}
                minimumTrackTintColor={appColors.font}
                maximumTrackTintColor="#e9ecef"
                thumbTintColor={appColors.font}
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>0 km</Text>
                <Text style={styles.sliderLabel}>5 km</Text>
                <Text style={styles.sliderLabel}>10+ km</Text>
              </View>
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.resetButton]}
              onPress={resetFilters}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.applyButton]}
              onPress={applyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};