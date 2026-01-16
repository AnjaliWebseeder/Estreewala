import { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import appColors from '../../../theme/appColors';

export default function FilterModal({
  visible,
  onClose,
  onApplyFilters,
  initialSelectedServices = [],
  onResetFilters,          // 👈 NEW
}) {
  const allServices = ['Ironing', 'Washing', 'Dry Wash', 'Wash & Iron', 'Steam Ironing', 'Spin Washing', 'Steam Washing', 'Stain Removal'];

  const [rating, setRating] = useState(0);
  const [distance, setDistance] = useState(0); // 0 = any distance
  const [tempDistance, setTempDistance] = useState(0); // slider temp
  const [selectedServices, setSelectedServices] = useState([]); // default none selected

  useEffect(() => {
    console.log("initialSelectedServices", initialSelectedServices);

    if (visible) {
      setSelectedServices(initialSelectedServices);
    }
  }, [visible, initialSelectedServices]);

  const applyFilters = () => {
    onApplyFilters({
      rating,
      distance: tempDistance,
      services: selectedServices
    });
  };

  const resetFilters = () => {
    setRating(0);
    setDistance(0);
    setTempDistance(0);
    setSelectedServices([]);
    onResetFilters?.();

    onApplyFilters({
      rating: 0,
      distance: 0,
      services: [],
      reset: true,
    });

    onClose();
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

          {/* Services */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Services</Text>
            {allServices.map(service => (
              <TouchableOpacity
                key={service}
                onPress={() => {
                  if (selectedServices.includes(service)) {
                    setSelectedServices(selectedServices.filter(s => s !== service));
                  } else {
                    setSelectedServices([...selectedServices, service]);
                  }
                }}
                style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}
              >
                <Icon
                  name={selectedServices.includes(service) ? "check-box" : "check-box-outline-blank"}
                  size={20}
                  color={appColors.font}
                />
                <Text style={{ marginLeft: 6 }}>{service}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Rating */}
          {/* <View style={styles.filterSection}>
            <Text style={[styles.filterLabel,{marginBottom:4}]}>Minimum Rating</Text>
            <View style={styles.ratingContainer}>
              {[1,2,3,4,5].map(star => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons
                    name={star <= rating ? "star" : "star-outline"}
                    size={20}
                    color="#FFD700"
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View> */}

          {/* Distance */}
          {/* <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { marginBottom: 6 }]}>
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
          </View> */}

          {/* Buttons */}
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
}
