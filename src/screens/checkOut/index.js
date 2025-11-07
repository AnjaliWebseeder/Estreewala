import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowIcon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import components
import { AddressCard } from '../../otherComponent/checkout/addressCard';
import AddressModal from '../../otherComponent/addressModal';
import { ScheduleModal } from '../../otherComponent/checkout/scheduleModal';
import ConfirmationModal from '../../otherComponent/checkout/confirmationModal';
import EmptyCart from '../../otherComponent/checkout/emptyCart';
import OrderItem from '../../otherComponent/checkout/OrderItem';

// Import styles
import { styles } from './styles';
import Header from '../../components/header';
import appColors from '../../theme/appColors';
import fonts from '../../theme/appFonts';
import { fontSizes } from '../../theme/appConstant';
import FastImage from 'react-native-fast-image';
import { cashpayment } from '../../utils/images/images';
import { CustomTooltip } from '../../components/tooltip';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  decrementQty,
  incrementQty,
  removeFromCart,
} from '../../redux/slices/cartSlice';

const LaundryCheckoutScreen = ({ navigation, route }) => {
  const { laundryName, vendorId } = route.params || {};
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  console.log('find vendorId  in cart screen ====>>> ', vendorId);

  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [pickupModalVisible, setPickupModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(
    'B 101, Nirvana Point, Hemllition',
  );
  const [selectedPickupDate, setSelectedPickupDate] = useState(new Date());
  const [selectedPickupSlot, setSelectedPickupSlot] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('cod'); // Default to Cash on Delivery
  const [orderNote, setOrderNote] = useState('');
  const [address, setAddress] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [showScheduleOptions, setShowScheduleOptions] = useState(false);

  const timeSlots = [
    { id: '1', time: '09:00 AM - 11:00 AM' },
    { id: '2', time: '11:00 AM - 01:00 PM' },
    { id: '3', time: '01:00 PM - 03:00 PM' },
    { id: '4', time: '03:00 PM - 05:00 PM' },
    { id: '5', time: '05:00 PM - 07:00 PM' },
    { id: '6', time: '07:00 PM - 09:00 PM' },
  ];

  // const [items, setItems] = useState([
  //   {
  //     id: 1,
  //     name: 'Formal Shirt',
  //     price: 5.0,
  //     service: 'Wash & Iron',
  //     quantity: 2,
  //   },
  // ]);

  const items = Object.entries(cartItems)?.map(([id, item]) => ({
    id,
    name: id,
    price: item.price || 0,
    service: item.service,
    quantity: item.qty,
  }));

  // Calculate delivery date based on pickup date (2 days later)
  const calculateDeliveryDate = pickupDate => {
    const deliveryDate = new Date(pickupDate);
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    return deliveryDate;
  };

  const [selectedDropDate, setSelectedDropDate] = useState(null);
  const [selectedDropSlot, setSelectedDropSlot] = useState(null);

  // Update delivery date when pickup date changes
  useEffect(() => {
    if (selectedPickupDate && selectedPickupSlot) {
      const newDeliveryDate = calculateDeliveryDate(selectedPickupDate);
      setSelectedDropDate(newDeliveryDate);
      // Set a default delivery time slot
      setSelectedDropSlot(timeSlots[2]); // Default to 3rd time slot
    } else {
      setSelectedDropDate(null);
      setSelectedDropSlot(null);
    }
  }, [selectedPickupDate, selectedPickupSlot]);

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
          isDefault: !selectedAddress,
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

  // const updateQuantity = (id, change) => {
  //   setItems(
  //     items.map(item =>
  //       item.id === id
  //         ? { ...item, quantity: Math.max(1, item.quantity + change) }
  //         : item,
  //     ),
  //   );
  // };

  const updateQuantity = (id, change) => {
    if (change === 1) dispatch(incrementQty(id));
    else dispatch(decrementQty(id));
  };

  const removeItem = id => {
    dispatch(removeFromCart(id));
  };

  // const removeItem = id => {
  //   setItems(items.filter(item => item.id !== id));
  // };

  const showClearAllConfirmation = () => {
    setConfirmationModalVisible(true);
  };

  const clearAllItems = () => {
    // setItems([]);
    dispatch(clearCart()); // 🧠 Redux action replaces local state clear
    setConfirmationModalVisible(false);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = items.length > 0 ? 2.5 : 0;
    const total = subtotal + deliveryFee;

    return {
      subtotal: subtotal.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const handleBookPickup = () => {
    // If schedule options are shown, proceed to schedule
    if (showScheduleOptions) {
      // Validate required fields
      if (!selectedPickupSlot) {
        setTooltipText('Please select a pickup time slot');
        setTooltipVisible(true);
        return;
      }

      if (!selectedAddress) {
        setTooltipText('Please select a delivery address');
        setTooltipVisible(true);
        return;
      }

      //  navigation.navigate('UserDetailsScreen');
      navigation.navigate('UserDetailsScreen', {
        vendorId: vendorId,
        pickupDate: selectedPickupDate,
        selectedDropDate: selectedDropDate,
        pickupSlot: selectedPickupSlot,
        paymentMethod: selectedPayment,
        note: orderNote,
        address: selectedAddress,
        editingAddress: editingAddress,
        tooltipVisible: tooltipVisible,
        tooltipText: tooltipText,
        showScheduleOptions: showScheduleOptions,
      });
    } else {
      // Show schedule options
      setShowScheduleOptions(true);
    }
  };

  const handlePlaceOrderNow = () => {
    // Validate required fields
    if (!selectedAddress) {
      setTooltipText('Please select a delivery address');
      setTooltipVisible(true);
      return;
    }

    // Set pickup to current date/time
    const now = new Date();
    setSelectedPickupDate(now);

    // Find the closest available time slot
    const currentHour = now.getHours();
    let closestSlot = timeSlots[0];

    for (const slot of timeSlots) {
      const slotStartHour = parseInt(slot.time.split(':')[0]);
      if (slotStartHour >= currentHour) {
        closestSlot = slot;
        break;
      }
    }

    setSelectedPickupSlot(closestSlot);

    // Proceed to confirmation
    navigation.navigate('UserDetailsScreen');
  };

  const handleSave = newAddress => {
    setAddress(newAddress);
    setAddressModalVisible(false);
    setEditingAddress(null);
  };

  const handleEdit = () => {
    setEditingAddress(address);
    setAddressModalVisible(true);
  };

  // const totals = calculateTotal();

  const handleBrowseServices = () => {
    navigation.navigate('Main');
  };

  const subtotal = items?.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const deliveryFee = 2.5; // or fetch dynamically
  const total = subtotal + deliveryFee;

  const totals = {
    subtotal: subtotal.toFixed(2),
    deliveryFee: deliveryFee.toFixed(2),
    total: total.toFixed(2),
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: appColors.background }}>
      <View style={styles.container}>
        {/* Header */}
        <View
          style={{ backgroundColor: appColors.darkBlue, paddingBottom: 10 }}
        >
          <Header
            onBackPress={() => {
              if (showScheduleOptions) {
                setShowScheduleOptions(false);
              } else {
                navigation.goBack();
              }
            }}
            iconColor={appColors.white}
            title={laundryName ? laundryName : 'QuickClean Laundry'}
            titleStyle={styles.titleStyle}
            containerStyle={{ justifyContent: 'flex-start' }}
          />
        </View>
        <View style={styles.border} />

        {items.length === 0 ? (
          <EmptyCart onBrowseServices={handleBrowseServices} />
        ) : (
          <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.sectionStyle}>
              <View style={styles.row}>
                <Icon
                  name="home"
                  size={20}
                  color={appColors.blue}
                  style={styles.iconStyle}
                />
                <Text style={[styles.sectionTitle, { marginTop: 1 }]}>
                  Pick up and Drop to Home
                </Text>
              </View>

              <AddressCard
                address={selectedAddress}
                onPress={() => setAddressModalVisible(true)}
                showEdit={true}
              />
            </View>
            <View style={styles.horizontalBorder} />

            {showScheduleOptions ? (
              <>
                <View
                  style={[
                    styles.section,
                    { paddingBottom: 7, paddingHorizontal: 0 },
                  ]}
                >
                  <View style={styles.scheduleRow}>
                    <TouchableOpacity
                      style={styles.scheduleCard}
                      onPress={() => setPickupModalVisible(true)}
                    >
                      <ArrowIcon
                        name="arrow-up-right"
                        size={24}
                        color={appColors.blue}
                      />
                      <View style={styles.scheduleInfo}>
                        <Text style={styles.scheduleLabel}>Pickup on</Text>
                        <Text style={styles.scheduleDate}>
                          {selectedPickupDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Text>
                        <Text
                          style={[
                            styles.scheduleDate,
                            { fontSize: fontSizes.FONT14 },
                          ]}
                        >
                          {selectedPickupSlot
                            ? selectedPickupSlot.time
                            : 'Select time slot'}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <View style={styles.verticalLine} />

                    {/* Delivery Card - Not clickable, automatically calculated */}
                    <View style={[styles.scheduleCard, styles.deliveryCard]}>
                      <ArrowIcon
                        name="arrow-down-left"
                        size={24}
                        color={appColors.blue}
                      />
                      <View style={styles.scheduleInfo}>
                        <Text style={styles.scheduleLabel}>Delivery on</Text>
                        {selectedDropDate ? (
                          <>
                            <Text style={styles.scheduleDate}>
                              {selectedDropDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </Text>
                            <Text style={styles.deliveryNote}>
                              Estimated delivery in 2-3 days
                            </Text>
                          </>
                        ) : (
                          <Text
                            style={[
                              styles.scheduleDate,
                              {
                                fontSize: fontSizes.FONT14,
                                color: appColors.subTitle,
                                lineHeight: 16,
                              },
                            ]}
                          >
                            Select pickup time first
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.horizontalBorder} />
              </>
            ) : (
              <View
                style={[
                  styles.section,
                  { marginHorizontal: 10, marginTop: 10 },
                ]}
              >
                <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
                  Delivery Options
                </Text>
                <View style={styles.deliveryOptions}>
                  <TouchableOpacity
                    style={[styles.deliveryOption, styles.primaryOption]}
                    onPress={() => setShowScheduleOptions(true)}
                  >
                    <Icon name="schedule" size={20} color={appColors.blue} />
                    <View style={styles.optionTextContainer}>
                      <Text style={styles.optionTitle}>Schedule Pickup</Text>
                      <Text style={styles.optionSubtitle}>
                        Choose date and time for pickup
                      </Text>
                    </View>
                    <Icon
                      name="chevron-right"
                      size={20}
                      color={appColors.blue}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deliveryOption}
                    onPress={handlePlaceOrderNow}
                  >
                    <Icon
                      name="shopping-cart-checkout"
                      size={20}
                      color={appColors.green}
                    />
                    <View style={styles.optionTextContainer}>
                      <Text style={styles.optionTitle}>Place Order Now</Text>
                      <Text style={styles.optionSubtitle}>
                        We'll pickup as soon as possible
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View style={styles.horizontalBorder} />

            <View style={styles.horizontalBorder} />

            <View style={[styles.section, { paddingVertical: 4 }]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={[styles.sectionTitle, { marginHorizontal: 10 }]}>
                  Order Items
                </Text>
                <TouchableOpacity
                  onPress={showClearAllConfirmation}
                  style={styles.clearAllButton}
                >
                  <Icon name="delete" size={18} color="#e53935" />
                </TouchableOpacity>
              </View>

              {items?.map(item => (
                <OrderItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                />
              ))}
            </View>

            <View style={[styles.section, { marginHorizontal: 10 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="description"
                  size={20}
                  style={styles.iconStyle}
                  color="#888"
                />
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

            <View style={styles.horizontalBorder} />

            <View
              style={[styles.section, { marginHorizontal: 10, marginTop: 10 }]}
            >
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Subtotal</Text>
                <Text style={styles.priceValue}>
                  <Icon
                    name="currency-rupee"
                    size={13}
                    color={appColors.font}
                  />
                  {/* {totals.subtotal} */} ₹{totals.subtotal}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Delivery fee</Text>
                <Text style={styles.priceValue}>
                  <Icon
                    name="currency-rupee"
                    size={13}
                    color={appColors.font}
                  />
                  {/* {totals.deliveryFee} */} ₹{totals.deliveryFee}
                </Text>
              </View>
              <View style={[styles.priceRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  {/* ₹{totals.total} */} ₹{totals.total}
                </Text>
              </View>
            </View>
            {items.length > 0 && (
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.payButton}
                  onPress={handleBookPickup}
                >
                  <Text style={styles.payButtonText}>
                    <Text style={{ marginBottom: 10 }}>
                      {showScheduleOptions
                        ? 'Schedule Pickup'
                        : 'Continue to Schedule'}
                    </Text>
                    <Text
                      style={[
                        styles.footerValue,
                        {
                          color: appColors.menuCard,
                          fontFamily: fonts.InterSemiBold,
                        },
                      ]}
                    >
                      {' '}
                      ₹{totals.total}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        )}

        <AddressModal
          visible={addressModalVisible}
          onClose={() => {
            setAddressModalVisible(false);
            setEditingAddress(null);
          }}
          onSave={handleSave}
          editingAddress={editingAddress}
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

        <ConfirmationModal
          visible={confirmationModalVisible}
          onClose={() => setConfirmationModalVisible(false)}
          onConfirm={clearAllItems}
          title="Delete All Items"
          message="Are you sure you want to remove all items from your cart?"
        />

        <CustomTooltip
          visible={tooltipVisible}
          message={tooltipText}
          onClose={() => setTooltipVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

export default LaundryCheckoutScreen;
