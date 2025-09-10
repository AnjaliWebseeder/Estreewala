import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressModal from '../../../otherComponent/addressModal'
import DeleteConfirmation from "../../../otherComponent/deleteConfirmation";
import Header from "../../../components/header";
import {styles} from './styles'
import appColors from "../../../theme/appColors";
import { LocationIcon } from "../../../assets/Icons/svg/locationIcon";

export default function ManageAddress({ navigation, route }) {
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      title: "Home",
      details: "1901 Tharndridge, Cir, Shiloh, Hawai 81063",
      isDefault: true
    },
    {
      id: "2",
      title: "Office",
      details: "4517 Washington Ave, Manchester, Kentucky 39495",
      isDefault: false
    }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(route.params?.selectedAddressId || "1");

  // Function to get current location
  const getCurrentLocation = () => {
    setIsLocating(true);
    
    // Simulate location fetching
    setTimeout(() => {
      setIsLocating(false);
      
      // For demo purposes, we'll add a sample current location
      const newId = (addresses.length + 1).toString();
      const newAddress = { 
        id: newId, 
        title: "Current Location", 
        details: "123 Main Street, Your City, State 12345",
        isCurrentLocation: true,
        isDefault: false
      };
      
      setAddresses([...addresses, newAddress]);
      setSelectedAddress(newId);
    }, 1500);
  };

  // Set address as default
  const setAsDefault = (id) => {
    const updatedAddresses = addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    }));
    setAddresses(updatedAddresses);
    setSelectedAddress(id);
  };

  // Select address (without setting as default)
  const selectAddress = (id) => {
    setSelectedAddress(id);
  };

  // Open Modal for Add or Edit
  const openModal = (item = null) => {
    if (item) {
      setEditingAddress(item);
    } else {
      setEditingAddress(null);
    }
    setModalVisible(true);
  };

  // Handle Save from modal
  const handleSave = (addressData) => {
    if (editingAddress) {
      // Update existing
      const updated = addresses.map((item) =>
        item.id === editingAddress.id 
          ? { ...item, title: addressData.title, details: addressData.details } 
          : item
      );
      setAddresses(updated);
    } else {
      // Add new
      const newId = (addresses.length + 1).toString();
      setAddresses([...addresses, { 
        id: newId, 
        title: addressData.title, 
        details: addressData.details,
        isDefault: false
      }]);
    }
    setModalVisible(false);
  };

  // Open delete confirmation
  const confirmDelete = (id) => {
    // Prevent deleting the default address
    const addressToDelete = addresses.find(addr => addr.id === id);
    if (addressToDelete?.isDefault) {
      alert("Cannot delete the default address. Please set another address as default first.");
      return;
    }
    
    setAddressToDelete(id);
    setDeleteModalVisible(true);
  };

  // Handle Delete
  const handleDelete = () => {
    const updatedAddresses = addresses.filter((item) => item.id !== addressToDelete);
    setAddresses(updatedAddresses);
    
    // If deleted address was selected, select the first address
    if (selectedAddress === addressToDelete && updatedAddresses.length > 0) {
      setSelectedAddress(updatedAddresses[0].id);
    }
    
    setDeleteModalVisible(false);
    setAddressToDelete(null);
  };

  // Apply selected address
  const applySelectedAddress = () => {
    const selected = addresses.find(addr => addr.id === selectedAddress);
    if (selected) {
      // Navigate back with selected address or perform other actions
  navigation.goBack()
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, selectedAddress === item.id && styles.selectedCard]}
      onPress={() => selectAddress(item.id)}
    >
      <View style={styles.row}>
        {/* Radio Button for Selection */}
        <TouchableOpacity 
          onPress={() => selectAddress(item.id)}
          style={styles.radioButton}
        >
          <View style={[
            styles.radioOuter,
            selectedAddress === item.id && styles.radioOuterSelected
          ]}>
            {selectedAddress === item.id && (
              <View style={styles.radioInner} />
            )}
          </View>
        </TouchableOpacity>
        
        <View style={styles.addressDetails}>
          <View style={styles.addressHeader}>
            <Text style={styles.title}>{item.title}</Text>
            {item.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>DEFAULT</Text>
              </View>
            )}
          </View>
          <Text style={styles.details}>{item.details}</Text>
        </View>

        {/* Edit Button - Hide for current location if desired */}
        {!item.isCurrentLocation && (
          <TouchableOpacity
            onPress={() => openModal(item)}
            style={styles.iconBtn}
          >
            <Icon name="create-outline" size={20} color="#1c1a1aff" />
          </TouchableOpacity>
        )}
        
        {/* Delete Button */}
        <TouchableOpacity
          onPress={() => confirmDelete(item.id)}
          style={styles.iconBtn}
        >
          <Icon name="trash-outline" size={20} color="#FF4D4D" />
        </TouchableOpacity>
      </View>

      {/* Set as Default Button (only show if not already default) */}
      {!item.isDefault && selectedAddress === item.id && (
        <TouchableOpacity 
          style={styles.setDefaultBtn}
          onPress={() => setAsDefault(item.id)}
        >
          <Text style={styles.setDefaultText}>Set Default Address</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Manage Address"
        onBackPress={() => navigation.goBack()}
        onRightPress={() => console.log("Settings pressed")}
      />
      
      {/* Use Current Location Button */}
      <TouchableOpacity 
        style={[styles.currentLocationBtn, isLocating && styles.currentLocationBtnDisabled]}
        onPress={getCurrentLocation}
        disabled={isLocating}
      >
        <View style={styles.currentLocationContent}>
          <Icon 
            name={isLocating ? "location" : "navigate"} 
            size={20} 
            color={appColors.blue} 
          />
          <Text style={styles.currentLocationText}>
            {isLocating ? "Detecting your location..." : "Use Current Location"}
          </Text>
        </View>
        {isLocating && (
          <View style={styles.loadingSpinner}>
            <Icon name="refresh" size={16} color={appColors.blue} />
          </View>
        )}
      </TouchableOpacity>

      {/* Address List */}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <LocationIcon size={40}/>
            <Text style={styles.emptyStateText}>No addresses saved yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add your first address or use your current location
            </Text>
          </View>
        }
      />

      {/* Add New Address */}
      <TouchableOpacity style={styles.addBtn} onPress={() => openModal()}>
        <Icon name="add-outline" size={20} color={appColors.blue} />
        <Text style={styles.addBtnText}>Add New Address</Text>
      </TouchableOpacity>

      {/* Apply Button */}
      <TouchableOpacity 
        style={[styles.applyBtn, !selectedAddress && styles.applyBtnDisabled]} 
        onPress={applySelectedAddress}
        disabled={!selectedAddress}
      >
        <Text style={styles.applyBtnText}>
          {selectedAddress ? "Apply Selected Address" : "Select an Address"}
        </Text>
      </TouchableOpacity>

      {/* Add/Edit Modal */}
      <AddressModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        editingAddress={editingAddress}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        visible={deleteModalVisible}
        onClose={() => {
          setDeleteModalVisible(false);
          setAddressToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </SafeAreaView>
  );
}