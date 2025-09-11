import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowIcon from "react-native-vector-icons/Feather";

// Import components
import { AddressCard } from '../../otherComponent/checkout/addressCard'
import { AddressModal } from "../../otherComponent/checkout/addressModal";
import { ScheduleModal } from '../../otherComponent/checkout/scheduleModal'
import { CouponModal } from '../../otherComponent/checkout/couponModal'
import { PaymentModal } from '../../otherComponent/checkout/paymentModal'
import ConfirmationModal from '../../otherComponent/checkout/confirmationModal'
import EmptyCart from '../../otherComponent/checkout/emptyCart'
import OrderItem from '../../otherComponent/checkout/OrderItem'

// Import styles
import { styles } from './styles';
import Header from "../../components/header";
import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";
import { fontSizes } from "../../theme/appConstant";

const LaundryCheckoutScreen = ({ navigation }) => {
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [pickupModalVisible, setPickupModalVisible] = useState(false);
  const [dropModalVisible, setDropModalVisible] = useState(false);
  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("B 101, Nirvana Point, Hemllition");
  const [selectedPickupDate, setSelectedPickupDate] = useState(new Date());
  const [selectedDropDate, setSelectedDropDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const [selectedPickupSlot, setSelectedPickupSlot] = useState(null);
  const [selectedDropSlot, setSelectedDropSlot] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [orderNote, setOrderNote] = useState('');
  
  const timeSlots = [
    { id: '1', time: '09:00 AM - 11:00 AM' },
    { id: '2', time: '11:00 AM - 01:00 PM' },
    { id: '3', time: '01:00 PM - 03:00 PM' },
    { id: '4', time: '03:00 PM - 05:00 PM' },
    { id: '5', time: '05:00 PM - 07:00 PM' },
    { id: '6', time: '07:00 PM - 09:00 PM' },
  ];

  const [items, setItems] = useState([
    { id: 1, name: "Formal Shirt", price: 5.00, service: "Wash & Iron", quantity: 2 },
    { id: 2, name: "Tshirt", price: 8.00, service: "Wash & Iron", quantity: 3 }
  ]);

  // Show toast message
  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'info' }), 3000);
  };

  // Load addresses from AsyncStorage and current location
  useEffect(() => {
    loadAddresses();
    loadCurrentLocation();
  }, []);

  const loadAddresses = async () => {
    try {
      const savedAddresses = await AsyncStorage.getItem('userAddresses');
      if (savedAddresses) {
        const addressesData = JSON.parse(savedAddresses);
        setAddresses(addressesData);
        
        const defaultAddress = addressesData.find(addr => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        }
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
      showToast('Error loading addresses', 'error');
    }
  };

  const loadCurrentLocation = async () => {
    try {
      const currentLocation = await AsyncStorage.getItem('currentLocation');
      if (currentLocation) {
        const locationData = JSON.parse(currentLocation);
        
        const currentLocationAddress = {
          id: 'current',
          name: 'Current Location',
          address: locationData.address,
          isCurrent: true,
          isDefault: !selectedAddress
        };
        
        setAddresses(prev => {
          const exists = prev.find(addr => addr.id === 'current');
          if (!exists) {
            return [currentLocationAddress, ...prev];
          }
          return prev;
        });
        
        if (!selectedAddress) {
          setSelectedAddress(currentLocationAddress);
        }
      }
    } catch (error) {
      console.error('Error loading current location:', error);
    }
  };

  // Date validation logic
  const validateDates = (pickupDate, dropDate, pickupSlot, dropSlot) => {
    if (pickupDate > dropDate) {
      showToast('Delivery date cannot be before pickup date', 'error');
      return false;
    }
    
    if (pickupDate.toDateString() === dropDate.toDateString()) {
      const pickupTime = parseInt(pickupSlot.time.split(':')[0]);
      const dropTime = parseInt(dropSlot.time.split(':')[0]);
      
      if (dropTime <= pickupTime) {
        showToast('Delivery time must be after pickup time', 'error');
        return false;
      }
    }
    
    return true;
  };

  const updateQuantity = (id, change) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    showToast('Item removed from cart', 'info');
  };

  const showClearAllConfirmation = () => {
    setConfirmationModalVisible(true);
  };

  const clearAllItems = () => {
    setItems([]);
    setConfirmationModalVisible(false);
    showToast('All items removed from cart', 'info');
  };

  const applyCoupon = (code) => {
    if (code === 'WELCOME10') {
      setDiscount(calculateSubtotal() * 0.1);
      showToast('Coupon applied successfully! 10% discount', 'success');
    } else if (code === 'CLEAN15') {
      const subtotal = calculateSubtotal();
      if (subtotal > 30) {
        setDiscount(subtotal * 0.15);
        showToast('Coupon applied successfully! 15% discount', 'success');
      } else {
        showToast('This coupon requires order above $30', 'error');
        setCouponCode('');
        setDiscount(0);
      }
    } else if (code) {
      showToast('The coupon code is not valid', 'error');
      setCouponCode('');
      setDiscount(0);
    } else {
      setDiscount(0);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = items.length > 0 ? 2.50 : 0;
    const taxes = subtotal * 0.08;
    const total = subtotal + deliveryFee + taxes - discount;
    
    return {
      subtotal: subtotal.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      taxes: taxes.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const handleConfirmPayment = () => {
    // if (!selectedAddress) {
    //   showToast('Please select a delivery address', 'error');
    //   return;
    // }
    
    // if (!selectedPickupSlot || !selectedDropSlot) {
    //   showToast('Please select pickup and delivery time slots', 'error');
    //   return;
    // }
    
    // if (!validateDates(selectedPickupDate, selectedDropDate, selectedPickupSlot, selectedDropSlot)) {
    //   return;
    // }
    
    // if (items.length === 0) {
    //   showToast('Please add items to your cart', 'error');
    //   return;
    // }
    
    // showToast('Your laundry order has been placed successfully!', 'success');
    setPaymentModalVisible(false);
    
    // In a real app, you would navigate to order confirmation screen
    setTimeout(() => {
      navigation.navigate('OrderConfirmation');
    }, 1000);
  };

  const totals = calculateTotal();

  const handleBrowseServices = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header 
        onBackPress={() => navigation.goBack()} 
        title={"QuickClean Laundry"} 
        titleStyle={styles.titleStyle} 
        containerStyle={{ justifyContent: "flex-start" }}
      />
      <View style={styles.border}/>
      
      {items.length === 0 ? (
        <EmptyCart onBrowseServices={handleBrowseServices} />
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainerStyle} showsVerticalScrollIndicator={false}>
          <View style={styles.sectionStyle}>
            <View style={styles.row}>
              <Icon name="home" size={20} color={appColors.blue} style={styles.iconStyle} />
              <Text style={[styles.sectionTitle, {marginTop: 1}]}>Pick up and Drop to Home</Text>
            </View>
            <AddressCard 
              address={selectedAddress}
              onPress={() => setAddressModalVisible(true)}
              showEdit={true}
            /> 
          </View>

          <View style={[styles.section, {paddingBottom: 7,paddingHorizontal:0}]}>
            <View style={styles.horizontalBorder}/>
            <View style={styles.scheduleRow}>
              <TouchableOpacity 
                style={styles.scheduleCard}
                onPress={() => setPickupModalVisible(true)}
              >
                <ArrowIcon name="arrow-up-right" size={24} color={appColors.blue} />
                <View style={styles.scheduleInfo}>
                  <Text style={styles.scheduleLabel}>Pickup on</Text>
                  <Text style={styles.scheduleDate}>
                    {selectedPickupDate.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Text>
                  <Text style={[styles.scheduleDate, {fontSize: fontSizes.FONT14}]}>
                    {selectedPickupSlot ? selectedPickupSlot.time : 'select time-slots'}
                  </Text>
                </View>
              </TouchableOpacity>
              
              <View style={styles.verticalLine}/>
              
              <TouchableOpacity 
                style={styles.scheduleCard}
                onPress={() => setDropModalVisible(true)}
              >
                <ArrowIcon name="arrow-down-left" size={24} color={appColors.blue} />
                <View style={styles.scheduleInfo}>
                  <Text style={styles.scheduleLabel}>Delivery on</Text>
                  <Text style={styles.scheduleDate}>
                    {selectedDropDate.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Text>
                  <Text style={[styles.scheduleDate, {fontSize: fontSizes.FONT14HALF}]}>
                    {selectedDropSlot ? selectedDropSlot.time : 'select time-slots'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.horizontalBorder}/>

          <View style={[styles.section, {paddingVertical: 4}]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={[styles.sectionTitle, {marginHorizontal: 10}]}>Order Items</Text>
              <TouchableOpacity onPress={showClearAllConfirmation} style={styles.clearAllButton}>
                <Icon name="delete" size={18} color="#e53935" />
              </TouchableOpacity>
            </View>
            
            {items.map((item) => (
              <OrderItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
              />
            ))}
          </View>

          <View style={[styles.section, {marginHorizontal: 10}]}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Icon name="description" size={20} style={styles.iconStyle} color='#888' />
              <TextInput
                style={styles.orderNoteInput}
                placeholder="Add Instructions (Optional)"
                value={orderNote}
                onChangeText={setOrderNote}
                multiline
                numberOfLines={5} 
                textAlignVertical="top" 
                placeholderTextColor={'#888'}
              />
            </View>
          </View>

          <View style={styles.horizontalBorder}/>
          
          <TouchableOpacity 
            style={styles.couponSection}
            onPress={() => setCouponModalVisible(true)}
          >
            <Icon name="local-offer" size={20} color='#888'/>
            <Text style={[styles.couponText, {color: couponCode ? appColors.font : "#888"}]}>
              {couponCode ? `Applied : ${couponCode}` : 'Apply Coupon'}
            </Text>
            <Icon style={styles.couponIcon} name="chevron-right" size={20} color='#888' />
          </TouchableOpacity>
          
          <View style={styles.horizontalBorder}/>

          <View style={[styles.section, {marginHorizontal: 10, marginTop: 10}]}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal</Text>
              <Text style={styles.priceValue}>
                <Icon name="currency-rupee" size={13} color={appColors.font} />
                {totals.subtotal}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Delivery fee</Text>
              <Text style={styles.priceValue}>
                <Icon name="currency-rupee" size={13} color={appColors.font} />
                {totals.deliveryFee}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Taxes</Text>
              <Text style={styles.priceValue}>
                <Icon name="currency-rupee" size={13} color={appColors.font} />
                {totals.taxes}
              </Text>
            </View>
            {discount > 0 && (
              <View style={styles.priceRow}>
                <Text style={[styles.priceLabel, styles.discountText]}>Discount</Text>
                <Text style={[styles.priceValue, styles.discountText]}>
                  -<Icon name="currency-rupee" size={13} color={'#4CAF50'} />
                  {totals.discount}
                </Text>
              </View>
            )}
            <View style={[styles.priceRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${totals.total}</Text>
            </View>
          </View>
        </ScrollView>
      )}

      {items.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.payButton}
            onPress={() => setPaymentModalVisible(true)}
          >
            <Text style={styles.payButtonText}>
              <Text style={{marginBottom: 10}}>Proceed to Pay</Text> 
              <Text style={[styles.footerValue, {color: appColors.blue, fontFamily: fonts.PoppinsSemiBold}]}>
              {" "} ${totals.total}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modals */}
      <AddressModal
        visible={addressModalVisible}
        onClose={() => setAddressModalVisible(false)}
        addresses={addresses}
        selectedAddress={selectedAddress}
        onSelectAddress={setSelectedAddress}
        onAddNewAddress={() => navigation.navigate('AddAddress')}
      />

      <ScheduleModal
        visible={pickupModalVisible}
        onClose={() => setPickupModalVisible(false)}
        type="pickup"
        selectedDate={selectedPickupDate}
        onDateChange={setSelectedPickupDate}
        selectedSlot={selectedPickupSlot}
        onSlotSelect={setSelectedPickupSlot}
        timeSlots={timeSlots}
        minDate={new Date()}
      />

      <ScheduleModal
        visible={dropModalVisible}
        onClose={() => setDropModalVisible(false)}
        type="delivery"
        selectedDate={selectedDropDate}
        onDateChange={setSelectedDropDate}
        selectedSlot={selectedDropSlot}
        onSlotSelect={setSelectedDropSlot}
        timeSlots={timeSlots}
        minDate={selectedPickupDate}
      />

      <CouponModal
        visible={couponModalVisible}
        onClose={() => setCouponModalVisible(false)}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        applyCoupon={applyCoupon}
      />

      <PaymentModal
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        selectedMethod={selectedPayment}
        onSelectMethod={setSelectedPayment}
        onConfirmPayment={handleConfirmPayment}
      />

      <ConfirmationModal
        visible={confirmationModalVisible}
        onClose={() => setConfirmationModalVisible(false)}
        onConfirm={clearAllItems}
        title="Delete All Items"
        message="Are you sure you want to remove all items from your cart?"
      />
    </View>
  );
};

export default LaundryCheckoutScreen;