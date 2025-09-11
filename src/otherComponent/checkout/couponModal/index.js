import  { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { modalStyles } from "../styles";

export const CouponModal = ({ visible, onClose, couponCode, setCouponCode, applyCoupon }) => {
  const [inputCode, setInputCode] = useState(couponCode);

  const handleApply = () => {
    setCouponCode(inputCode);
    applyCoupon(inputCode);
    onClose();
  };

  return (
    <Modal visible={visible} animationType={"none"} transparent>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>Apply Coupon</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={modalStyles.input}
            placeholder="Enter coupon code"
            value={inputCode}
            onChangeText={setInputCode}
            placeholderTextColor={"#6888"}
          />

          <TouchableOpacity 
            style={modalStyles.applyButton}
            onPress={handleApply}
          >
            <Text style={modalStyles.applyButtonText}>Apply Coupon</Text>
          </TouchableOpacity>

          <View style={modalStyles.couponList}>
            <Text style={[modalStyles.sectionTitle,{marginBottom:10}]}>Available Coupons</Text>
            <View style={modalStyles.couponItem}>
              <View style={modalStyles.couponInfo}>
                <Text style={modalStyles.couponCode}>WELCOME10</Text>
                <Text style={modalStyles.couponDesc}>10% off on first order</Text>
              </View>
              <TouchableOpacity onPress={() => setInputCode('WELCOME10')}>
                <Text style={modalStyles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>
            <View style={modalStyles.couponItem}>
              <View style={modalStyles.couponInfo}>
                <Text style={modalStyles.couponCode}>CLEAN15</Text>
                <Text style={modalStyles.couponDesc}>15% off on orders above $30</Text>
              </View>
              <TouchableOpacity onPress={() => setInputCode('CLEAN15')}>
                <Text style={modalStyles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
