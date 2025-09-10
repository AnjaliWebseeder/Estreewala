import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  TextInput,
  Modal,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";
import PickupDropModal from '../../otherComponent/checkout/pickupDropModal'
import PaymentModal from '../../otherComponent/checkout/paymentModal'

const LaundryCheckoutScreen = () => {
  const [pickupModalVisible, setPickupModalVisible] = useState(false);
  const [dropModalVisible, setDropModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [instructionModalVisible, setInstructionModalVisible] = useState(false);
  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState({
    id: 1,
    name: "Home",
    address: "B101, Nirvana Point, Hamilton",
    isDefault: true
  });
  const [items, setItems] = useState([
    { id: 1, name: "Formal Shirt", price: 5.00, service: "Wash & Iron", quantity: 1 },
    { id: 2, name: "Tshirt", price: 8.00, service: "Wash & Iron", quantity: 1 }
  ]);
  const [pickupDate, setPickupDate] = useState("20 Jun, 15:00 AM");
  const [dropDate, setDropDate] = useState("20 Jun, 08:00 PM");
  const [selectedPayment, setSelectedPayment] = useState("PayPal");

  const updateQuantity = (id, change) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const calculateTotal = () => {
    const itemTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 2.50;
    const taxes = 1.50;
    const discount = couponCode ? 2.00 : 0; // Example discount
    return {
      itemTotal: itemTotal.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      taxes: taxes.toFixed(2),
      discount: discount.toFixed(2),
      total: (itemTotal + deliveryFee + taxes - discount).toFixed(2)
    };
  };

  const totals = calculateTotal();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>QuickClean Laundry</Text>
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={() => setAddressModalVisible(true)}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.addressContainer}>
            <View style={styles.addressBadge}>
              <Text style={styles.addressBadgeText}>{selectedAddress.name}</Text>
            </View>
            <Text style={styles.addressText}>{selectedAddress.address}</Text>
            {selectedAddress.isDefault && (
              <Text style={styles.defaultText}>Default Address</Text>
            )}
          </View>
        </View>

        {/* Pickup & Drop Row */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.timeBox} 
            onPress={() => setPickupModalVisible(true)}
          >
            <Icon name="calendar-outline" size={20} color={appColors.primary} />
            <Text style={styles.timeLabel}>Pickup on</Text>
            <Text style={styles.timeValue}>{pickupDate}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.timeBox} 
            onPress={() => setDropModalVisible(true)}
          >
            <Icon name="calendar-outline" size={20} color={appColors.primary} />
            <Text style={styles.timeLabel}>Drop on</Text>
            <Text style={styles.timeValue}>{dropDate}</Text>
          </TouchableOpacity>
        </View>

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <View style={styles.itemRow}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemSubText}>{item.service}</Text>
                </View>
                <View style={styles.counter}>
                  <TouchableOpacity 
                    style={styles.counterBtn}
                    onPress={() => updateQuantity(item.id, -1)}
                  >
                    <Text style={styles.counterText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qty}>{item.quantity}</Text>
                  <TouchableOpacity 
                    style={styles.counterBtn}
                    onPress={() => updateQuantity(item.id, 1)}
                  >
                    <Text style={styles.counterText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Add Instruction */}
        <TouchableOpacity 
          style={styles.addInstruction}
          onPress={() => setInstructionModalVisible(true)}
        >
          <Icon name="create-outline" size={20} color={appColors.gray} />
          <Text style={styles.addInstructionText}>
            {instruction ? instruction : "Add Special Instructions"}
          </Text>
          <Icon name="chevron-forward" size={20} color={appColors.gray} />
        </TouchableOpacity>

        {/* Coupon */}
        <TouchableOpacity 
          style={styles.couponRow}
          onPress={() => setCouponModalVisible(true)}
        >
          <Icon name="pricetag-outline" size={20} color={appColors.primary} />
          <Text style={styles.couponText}>
            {couponCode ? `Coupon: ${couponCode}` : "Apply Coupon"}
          </Text>
          <Icon name="chevron-forward" size={20} color={appColors.gray} />
        </TouchableOpacity>

        {/* Price Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Item total</Text>
            <Text style={styles.priceValue}>${totals.itemTotal}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery fee</Text>
            <Text style={styles.priceValue}>${totals.deliveryFee}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Taxes & Charges</Text>
            <Text style={styles.priceValue}>${totals.taxes}</Text>
          </View>
          {couponCode && (
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, styles.discountText]}>Discount</Text>
              <Text style={[styles.priceValue, styles.discountText]}>-${totals.discount}</Text>
            </View>
          )}
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>To Pay</Text>
            <Text style={styles.totalValue}>${totals.total}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Proceed to Pay Button */}
      <View style={styles.footer}>
        <View style={styles.footerPrice}>
          <Text style={styles.footerLabel}>Total Amount:</Text>
          <Text style={styles.footerValue}>${totals.total}</Text>
        </View>
        <TouchableOpacity 
          style={styles.payBtn} 
          onPress={() => setPaymentModalVisible(true)}
        >
          <Text style={styles.payBtnText}>Proceed to Pay</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <PickupDropModal 
        type="pickup"
        visible={pickupModalVisible} 
        onClose={() => setPickupModalVisible(false)}
        onSelect={(date, time) => setPickupDate(`${date}, ${time}`)}
      />
      
      <PickupDropModal 
        type="drop"
        visible={dropModalVisible} 
        onClose={() => setDropModalVisible(false)}
        onSelect={(date, time) => setDropDate(`${date}, ${time}`)}
      />
      
      <PaymentModal 
        visible={paymentModalVisible} 
        onClose={() => setPaymentModalVisible(false)}
        selected={selectedPayment}
        onSelect={setSelectedPayment}
      />
      
      <InstructionModal 
        visible={instructionModalVisible} 
        onClose={() => setInstructionModalVisible(false)}
        instruction={instruction}
        setInstruction={setInstruction}
      />
      
      <CouponModal 
        visible={couponModalVisible} 
        onClose={() => setCouponModalVisible(false)}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
      />
      
      <AddressModal 
        visible={addressModalVisible} 
        onClose={() => setAddressModalVisible(false)}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
    </View>
  );
};

// Instruction Modal Component
const InstructionModal = ({ visible, onClose, instruction, setInstruction }) => {
  const [tempInstruction, setTempInstruction] = useState(instruction);

  const handleSave = () => {
    setInstruction(tempInstruction);
    onClose();
  };

  const handleCancel = () => {
    setTempInstruction(instruction);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>Add Instruction</Text>
            <TouchableOpacity onPress={handleCancel}>
              <Icon name="close" size={24} color={appColors.gray} />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={modalStyles.input}
            placeholder="Enter your instructions here..."
            value={tempInstruction}
            onChangeText={setTempInstruction}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          
          <View style={modalStyles.buttonContainer}>
            <TouchableOpacity style={modalStyles.cancelButton} onPress={handleCancel}>
              <Text style={modalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={modalStyles.confirmButton} onPress={handleSave}>
              <Text style={modalStyles.confirmButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Coupon Modal Component
const CouponModal = ({ visible, onClose, couponCode, setCouponCode }) => {
  const [tempCoupon, setTempCoupon] = useState(couponCode);

  const handleApply = () => {
    setCouponCode(tempCoupon);
    onClose();
  };

  const handleCancel = () => {
    setTempCoupon(couponCode);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>Apply Coupon</Text>
            <TouchableOpacity onPress={handleCancel}>
              <Icon name="close" size={24} color={appColors.gray} />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={modalStyles.input}
            placeholder="Enter coupon code"
            value={tempCoupon}
            onChangeText={setTempCoupon}
          />
          
          <View style={modalStyles.buttonContainer}>
            <TouchableOpacity style={modalStyles.cancelButton} onPress={handleCancel}>
              <Text style={modalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={modalStyles.confirmButton} onPress={handleApply}>
              <Text style={modalStyles.confirmButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Address Modal Component
const AddressModal = ({ visible, onClose, selectedAddress, setSelectedAddress }) => {
  const [addresses, setAddresses] = useState([
    { id: 1, name: "Home", address: "B101, Nirvana Point, Hamilton", isDefault: true },
    { id: 2, name: "Work", address: "Tech Park, Building C, Floor 5", isDefault: false },
    { id: 3, name: "Mom's House", address: "123 Main Street, Apartment 4B", isDefault: false }
  ]);

  const handleSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>Select Address</Text>
            <TouchableOpacity onPress={handleCancel}>
              <Icon name="close" size={24} color={appColors.gray} />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[
                  modalStyles.addressItem,
                  selectedAddress.id === item.id && modalStyles.addressItemSelected
                ]}
                onPress={() => handleSelect(item)}
              >
                <View style={modalStyles.radio}>
                  {selectedAddress.id === item.id && <View style={modalStyles.radioSelected} />}
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
          
          <TouchableOpacity style={modalStyles.addAddressButton}>
            <Icon name="add" size={20} color={appColors.primary} />
            <Text style={modalStyles.addAddressText}>Add New Address</Text>
          </TouchableOpacity>
          
          <View style={modalStyles.buttonContainer}>
            <TouchableOpacity style={modalStyles.cancelButton} onPress={handleCancel}>
              <Text style={modalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={modalStyles.confirmButton} onPress={onClose}>
              <Text style={modalStyles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f8f9fa" 
  },
  header: {
    backgroundColor: appColors.primary,
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: '#fff'
  },
  section: { 
    backgroundColor: "#fff", 
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: { 
    fontSize: 16, 
    fontFamily: fonts.semiBold, 
    color: appColors.text,
  },
  changeText: {
    fontSize: 14,
    color: appColors.primary,
    fontFamily: fonts.medium
  },
  addressContainer: {
    marginTop: 4
  },
  addressBadge: {
    backgroundColor: appColors.lightPrimary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  addressBadgeText: {
    fontSize: 12,
    color: appColors.primary,
    fontFamily: fonts.medium
  },
  addressText: { 
    fontSize: 14, 
    color: appColors.text,
    fontFamily: fonts.regular,
    marginBottom: 4
  },
  defaultText: {
    fontSize: 12,
    color: appColors.gray
  },
  row: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginHorizontal: 16,
    marginVertical: 8
  },
  timeBox: { 
    flex: 1, 
    padding: 16, 
    margin: 4, 
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  timeLabel: { 
    fontSize: 12, 
    color: appColors.gray, 
    marginTop: 8,
    marginBottom: 4,
    fontFamily: fonts.medium
  },
  timeValue: { 
    fontSize: 14, 
    fontFamily: fonts.medium, 
    color: appColors.text
  },
  itemContainer: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border
  },
  itemRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: 'center',
    marginBottom: 8
  },
  itemInfo: {
    flex: 1
  },
  itemText: { 
    fontSize: 16, 
    fontFamily: fonts.medium,
    color: appColors.text,
    marginBottom: 4
  },
  itemSubText: { 
    fontSize: 14, 
    color: appColors.gray,
    fontFamily: fonts.regular
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemPrice: {
    fontSize: 14,
    color: appColors.gray
  },
  itemTotal: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: appColors.text
  },
  counter: { 
    flexDirection: "row", 
    alignItems: "center",
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 4
  },
  counterBtn: { 
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: appColors.primary
  },
  qty: { 
    fontSize: 16, 
    fontFamily: fonts.medium,
    marginHorizontal: 12,
    color: appColors.text
  },
  addInstruction: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 16,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  addInstructionText: { 
    flex: 1,
    marginLeft: 12, 
    fontSize: 14, 
    color: appColors.gray,
    fontFamily: fonts.regular
  },
  couponRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 16,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  couponText: { 
    flex: 1,
    marginLeft: 12, 
    fontSize: 14, 
    fontFamily: fonts.medium, 
    color: appColors.primary 
  },
  priceRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 8
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: appColors.border,
    paddingTop: 12,
    marginTop: 8
  },
  priceLabel: { 
    fontSize: 14, 
    color: appColors.gray,
    fontFamily: fonts.regular
  },
  priceValue: { 
    fontSize: 14, 
    fontFamily: fonts.medium,
    color: appColors.text
  },
  discountText: {
    color: appColors.success
  },
  totalLabel: { 
    fontSize: 16, 
    fontFamily: fonts.semiBold,
    color: appColors.text
  },
  totalValue: { 
    fontSize: 16, 
    fontFamily: fonts.semiBold,
    color: appColors.primary
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: appColors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  footerPrice: {
    flex: 1
  },
  footerLabel: {
    fontSize: 14,
    color: appColors.gray,
    fontFamily: fonts.regular
  },
  footerValue: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: appColors.primary
  },
  payBtn: { 
    backgroundColor: appColors.primary, 
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12, 
    marginLeft: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6
  },
  payBtnText: { 
    fontSize: 16, 
    fontFamily: fonts.semiBold, 
    color: "#fff" 
  },
});

const modalStyles = StyleSheet.create({
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
    maxHeight: '90%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: appColors.text
  },
  input: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    fontSize: 14,
    fontFamily: fonts.regular,
    minHeight: 100
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
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef'
  },
  addressItemSelected: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginHorizontal: -8,
    paddingHorizontal: 8
  },
  radio: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: appColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 4
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: appColors.primary
  },
  addressDetails: {
    flex: 1
  },
  addressNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  addressName: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: appColors.text,
    marginRight: 8
  },
  defaultBadge: {
    backgroundColor: appColors.lightPrimary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4
  },
  defaultBadgeText: {
    fontSize: 10,
    color: appColors.primary,
    fontFamily: fonts.medium
  },
  addressText: {
    fontSize: 14,
    color: appColors.gray,
    fontFamily: fonts.regular
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    justifyContent: 'center'
  },
  addAddressText: {
    fontSize: 14,
    color: appColors.primary,
    fontFamily: fonts.medium,
    marginLeft: 8
  }
});

export default LaundryCheckoutScreen;