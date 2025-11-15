import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { 
  getAddresses, 
  addAddress, 
  updateAddress, 
  deleteAddress, 
  setSelectedAddress,
  resetAddressState 
} from "../../../redux/slices/addressSlice";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressModal from '../../../otherComponent/addressModal';
import DeleteConfirmation from "../../../otherComponent/deleteConfirmation";
import Header from "../../../components/header";
import { styles } from './styles';
import appColors from "../../../theme/appColors";
import { LocationIcon } from "../../../assets/Icons/svg/locationIcon";
import { useAuth } from "../../../utils/context/authContext";
import { useToast } from "../../../utils/context/toastContext";

export default function ManageAddress({ navigation, route }) {
  const dispatch = useDispatch();
  const { 
    addresses, 
    addressesLoading, 
    selectedAddress 
  } = useSelector(state => state.address);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [localSelectedAddress, setLocalSelectedAddress] = useState(
    route.params?.selectedAddressId || selectedAddress || (addresses.length > 0 ? addresses[0]._id : null)
  );
  
  const { userLocation } = useAuth();
  const { showToast } = useToast();

  // Check if user has any addresses
  const hasAddresses = addresses && addresses.length > 0;

  const removeDuplicateParts = (address) => {
    if (!address) return '';
    
    const parts = address.split(',').map(p => p.trim());
    const uniqueParts = [];
    
    parts.forEach((part, index) => {
      // avoid consecutive duplicates
      if (part && part !== parts[index - 1] && !uniqueParts.includes(part)) {
        uniqueParts.push(part);
      }
    });

    return uniqueParts.join(', ');
  };

  // Fetch addresses on component mount
  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  // Update local selected address when addresses load
  useEffect(() => {
    if (addresses.length > 0 && !localSelectedAddress) {
      const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
      setLocalSelectedAddress(defaultAddress._id);
    }
  }, [addresses, localSelectedAddress]);

  // Clear states when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetAddressState());
    };
  }, [dispatch]);

  // Handle current location
  const getCurrentLocation = async () => {
    if (!userLocation) {
      showToast("Location Not Available", "Please enable location services to use this feature", "error");
      return;
    }

    setIsLocating(true);

    try {
      // Prepare address object exactly like your console output
      const addressData = {
        type: "Home",
        location: {
          address: removeDuplicateParts(userLocation.address),
          coordinates: [userLocation.longitude, userLocation.latitude],
        },
        isDefault: addresses.length === 0 ? true : false,
      };

      console.log("📍 Adding current location:", addressData);

      const result = await dispatch(addAddress(addressData)).unwrap();

      // Handle the different possible response shapes
      const newAddressId =
        result?._id ||
        result?.id ||
        (result?.addresses && result?.addresses[0]?._id);

      if (newAddressId) {
        setLocalSelectedAddress(newAddressId);
        console.log("✅ Address saved successfully:", newAddressId);
      } else {
        console.log("⚠️ Address saved but ID missing, refetching list...");
        dispatch(getAddresses());
      }
    } catch (error) {
      console.error("❌ Error adding current location:", error);
      showToast(error?.message || "Failed to add current location. Please try again.", "error");
    } finally {
      setIsLocating(false);
    }
  };

  const setAsDefault = async (id) => {
    try {
      const address = addresses.find(addr => addr._id === id);
      if (address) {
        const updateData = {
          type: address.type,
          location: address.location,
          isDefault: true
        };
        
        await dispatch(updateAddress({ id, addressData: updateData })).unwrap();
        setLocalSelectedAddress(id);
        dispatch(setSelectedAddress(id));
      }
    } catch (error) {
        showToast( error || "Failed to set default address. Please try again.", "error");
    }
  };

  const selectAddress = (id) => {
    setLocalSelectedAddress(id);
  };

 const openModal = (item = null) => {
  // Instead of opening modal, navigate to MapAddressScreen
  navigation.navigate('MapAddressScreen', {
    editingAddress: item
  });
};

  const handleSave = async (addressData) => {
    try {
      const apiAddressData = {
        type: addressData.title,
        location: {
          address: addressData.details,
          coordinates: [userLocation.longitude, userLocation.latitude],
        },
        isDefault: false
      };

      if (editingAddress) {
        await dispatch(updateAddress({ 
          id: editingAddress._id, 
          addressData: { ...apiAddressData, isDefault: editingAddress.isDefault }
        })).unwrap();
      } else {
        await dispatch(addAddress(apiAddressData)).unwrap();
      }
      
      setModalVisible(false);
      setEditingAddress(null);
      
    } catch (error) {
      showToast("Error", error || "Failed to save address. Please try again.", "error");
    }
  };

  const confirmDelete = (id) => {
    const addressToDelete = addresses.find(addr => addr._id === id);
    if (addressToDelete?.isDefault) {
      showToast( "Cannot delete the default address. Please set another address as default first.", "error");
      return;
    }
    
    setAddressToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (addressToDelete) {
      try {
        await dispatch(deleteAddress(addressToDelete)).unwrap();
      } catch (error) {
        showToast( error || "Failed to delete address. Please try again.", "error");
      }
    }
    setDeleteModalVisible(false);
    setAddressToDelete(null);
  };

  const applySelectedAddress = () => {
    const selected = addresses.find(addr => addr._id === localSelectedAddress);
    if (selected) {
      dispatch(setSelectedAddress(localSelectedAddress));
      navigation.goBack();
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, localSelectedAddress === item._id && styles.selectedCard]}
      onPress={() => selectAddress(item._id)}
    >
      <View style={styles.row}>
        <TouchableOpacity 
          onPress={() => selectAddress(item._id)}
          style={styles.radioButton}
        >
          <View style={[
            styles.radioOuter,
            localSelectedAddress === item._id && styles.radioOuterSelected
          ]}>
            {localSelectedAddress === item._id && (
              <View style={styles.radioInner} />
            )}
          </View>
        </TouchableOpacity>
        
        <View style={styles.addressDetails}>
          <View style={styles.addressHeader}>
            <Text style={styles.title}>{item.type}</Text>
            {item.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>DEFAULT</Text>
              </View>
            )}
          </View>
          <Text style={styles.details}>{item.location?.address}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => openModal(item)}
            style={styles.iconBtn}
          >
            <Icon name="create-outline" size={20} color="#1c1a1aff" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => confirmDelete(item._id)}
            style={styles.iconBtn}
          >
            <Icon name="trash-outline" size={20} color="#FF4D4D" />
          </TouchableOpacity>
        </View>
      </View>

      {!item.isDefault && localSelectedAddress === item._id && (
        <TouchableOpacity 
          style={styles.setDefaultBtn}
          onPress={() => setAsDefault(item._id)}
        >
          <Text style={styles.setDefaultText}>Set as Default Address</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Manage Address"
        onBackPress={() => navigation.goBack()}
      />
      
      {/* Current Location Button - Only show if user has NO addresses */}
      {!hasAddresses && (
        <TouchableOpacity 
          style={[styles.currentLocationBtn, (isLocating || !userLocation) && styles.currentLocationBtnDisabled]}
          onPress={getCurrentLocation}
          disabled={isLocating || !userLocation}
        >
          <View style={styles.currentLocationContent}>
            {isLocating ? (
              <ActivityIndicator size="small" color={appColors.blue} />
            ) : (
              <Icon name="navigate" size={20} color={appColors.blue} />
            )}
            <Text style={styles.currentLocationText}>
              {isLocating ? "Adding Location..." : "Use Current Location"}
            </Text>
          </View>
          {!userLocation && (
            <Text style={styles.locationUnavailableText}>
              Location unavailable
            </Text>
          )}
        </TouchableOpacity>
      )}

      {/* Address List */}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item._id || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={{ 
          padding: 16,
          // Add some extra padding at top when "Use Current Location" is hidden
          paddingTop: hasAddresses ? 16 : 0
        }}
        refreshing={addressesLoading}
        onRefresh={() => dispatch(getAddresses())}
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

      {/* Add New Address Button - Always show this */}
      {/* <TouchableOpacity 
        style={styles.addNewButton}
        onPress={() => openModal()}
      >
        <Icon name="add-circle-outline" size={20} color={appColors.primary} />
        <Text style={styles.addNewButtonText}>Add New Address</Text>
      </TouchableOpacity> */}

      {/* Apply Button */}
      {hasAddresses && (
        <TouchableOpacity 
          style={[styles.applyBtn, !localSelectedAddress && styles.applyBtnDisabled]} 
          onPress={applySelectedAddress}
          disabled={!localSelectedAddress}
        >
          <Text style={styles.applyBtnText}>
            {localSelectedAddress ? "Apply Selected Address" : "Select an Address"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Modals */}
      <AddressModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingAddress(null);
        }}
        onSave={handleSave}
        editingAddress={editingAddress}
      />

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