import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { modalStyles } from "../styles";
import appColors from "../../../theme/appColors";

export const AddressModal = ({ visible, onClose, addresses, selectedAddress, onSelectAddress, onAddNewAddress }) => {
  return (
    <Modal visible={visible} animationType={"none"} transparent>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>Select Address</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  modalStyles.addressItem,
                  selectedAddress?.id === item.id && modalStyles.addressItemSelected
                ]}
                onPress={() => onSelectAddress(item)}
              >
                <View style={modalStyles.radio}>
                  {selectedAddress?.id === item.id && <View style={modalStyles.radioSelected} />}
                </View>
                <View style={modalStyles.addressDetails}>
                  <View style={modalStyles.addressNameRow}>
                    <Text style={modalStyles.addressName}>{item.name}</Text>
                    {item.isDefault && (
                      <View style={modalStyles.defaultBadge}>
                        <Text style={modalStyles.defaultBadgeText}>Default</Text>
                      </View>
                    )}
                  </View>
                  <Text style={modalStyles.addressText}>{item.address}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          
          <TouchableOpacity 
            style={modalStyles.addAddressButton}
            onPress={onAddNewAddress}
          >
            <Icon name="add" size={20} color={appColors.blue} />
            <Text style={modalStyles.addAddressText}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
