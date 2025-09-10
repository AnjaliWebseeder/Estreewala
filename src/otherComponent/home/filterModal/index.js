import { View, Text , Modal,TouchableOpacity} from 'react-native'
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

export default function FilterModal ({ visible, onClose, onApplyFilters }) {
  const [rating, setRating] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [distance, setDistance] = useState('');

  const applyFilters = () => {
    // onApplyFilters({ rating, deliveryTime, distance });
    onClose();
  };

  const resetFilters = () => {
    setRating(0);
    setDeliveryTime('');
    setDistance('');
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
            <Text style={styles.filterLabel}>Minimum Rating</Text>
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
            <Text style={styles.filterLabel}>Distance</Text>
            <View style={styles.optionsContainer}>
              {['Under 1 km', '1-3 km', '3-5 km', '5+ km'].map((dist) => (
                <TouchableOpacity
                  key={dist}
                  style={[
                    styles.optionButton,
                    distance === dist && styles.optionButtonSelected
                  ]}
                  onPress={() => setDistance(dist)}
                >
                  <Text style={[
                    styles.optionText,
                    distance === dist && styles.optionTextSelected
                  ]}>
                    {dist}
                  </Text>
                </TouchableOpacity>
              ))}
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
