import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { styles } from './styles';
import appColors from "../../theme/appColors";

const AddressModal = ({ visible, onClose, onSave, editingAddress }) => {
  const [addressType, setAddressType] = useState("home");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState({});

  const addressTypes = [
    { key: "home", label: "Home", icon: "home-outline" },
    { key: "office", label: "Office", icon: "business-outline" },
    { key: "other", label: "Other", icon: "location-outline" }
  ];

  useEffect(() => {
    if (editingAddress) {
      // Handle API response structure
      const editingType = editingAddress.type?.toLowerCase() || "home";
      if (editingType === "home" || editingType === "office" || editingType === "other") {
        setAddressType(editingType);
      } else {
        setAddressType("other");
      }
      setDetails(editingAddress.location?.address || "");
    } else {
      setAddressType("home");
      setDetails("");
    }
    setErrors({});
  }, [editingAddress, visible]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!details.trim()) {
      newErrors.details = "Address details are required";
    } else if (details.trim().length < 10) {
      newErrors.details = "Address should be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      let finalTitle;
      
      if (addressType === "home") {
        finalTitle = "Home";
      } else if (addressType === "office") {
        finalTitle = "Office";
      } else {
        finalTitle = "Other";
      }
      
      onSave({ 
        title: finalTitle, 
        details: details.trim() 
      });
    }
  };

  const handleAddressTypeSelect = (type) => {
    setAddressType(type);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {editingAddress ? "Edit Address" : "Add New Address"}
          </Text>
          
          {/* Address Type Selection */}
          <Text style={styles.sectionLabel}>Address Type</Text>
          <View style={styles.addressTypeRow}>
            {addressTypes.map((type) => (
              <TouchableOpacity
                key={type.key}
                style={styles.addressTypeOption}
                onPress={() => handleAddressTypeSelect(type.key)}
              >
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioOuter,
                    addressType === type.key && styles.radioOuterSelected
                  ]}>
                    {addressType === type.key && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                 
                  <Text style={[
                    styles.addressTypeLabel,
                    addressType === type.key && styles.addressTypeLabelSelected
                  ]}>
                    {type.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Address Details */}
          <Text style={styles.sectionLabel}>Full Address</Text>
          <TextInput
            placeholder="Enter complete address details"
            placeholderTextColor={appColors.subTitle}
            value={details}
            onChangeText={(text) => {
              setDetails(text);
              if (errors.details) setErrors({...errors, details: ""});
            }}
            style={[styles.input, styles.textArea, errors.details && styles.inputError]}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          {errors.details && (
            <Text style={styles.errorText}>{errors.details}</Text>
          )}
          
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalBtn, styles.cancelBtn]}
              onPress={onClose}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalBtn, styles.saveBtn]}
              onPress={handleSave}
            >
              <Text style={styles.saveBtnText}>
                {editingAddress ? "Update" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddressModal;