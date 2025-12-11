import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, StatusBar } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  decrementQty,
  incrementQty,
  removeFromCart,
} from '../../redux/slices/cartSlice';
import { CustomTooltip } from '../../components/tooltip';

const LaundryCheckoutScreen = ({ navigation, route }) => {
  const { laundryName, vendorId } = route.params || {};
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
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

  // Helper function to format cart items for display
 // Update formatCartItemsForDisplay function
const formatCartItemsForDisplay = useMemo(() => {
  if (!cartItems || typeof cartItems !== 'object') return [];
  
  console.log("🛒 Raw cart items:", cartItems);
  console.log("🔑 Cart item keys:", Object.keys(cartItems));
  
  // Convert cart items object to array for display
  const cartItemsArray = Object.values(cartItems);
  
  // Format for display in OrderItem components
  const formattedItems = cartItemsArray.map((item, index) => {
    // The unique key from Redux cart is the key itself (like "Formal Shirt_man_Steam Ironing")
    // We need to get this from the cartItems object keys
    const cartKeys = Object.keys(cartItems);
    const uniqueKey = cartKeys[index]; // This is the actual key in Redux
    
    return {
      id: uniqueKey, // Use the actual Redux key as ID
      uniqueKey: uniqueKey, // Pass the actual Redux key
      name: item.name || item.itemName || item.itemId || 'Unknown Item',
      price: item.price || 0,
      service: item.service || 'Unknown Service',
      quantity: item.qty || 0,
      category: item.category || 'general',
      itemId: item.itemId, // Original item ID
      serviceName: item.service // Service name
    };
  });
  
  console.log("📦 Formatted display items with keys:", formattedItems.map(item => item.uniqueKey));
  return formattedItems;
}, [cartItems]);

  // Helper function to format cart items for API
  const formatCartItemsForAPI = useMemo(() => {
    if (!cartItems || typeof cartItems !== 'object') return [];
    
    const cartItemsArray = Object.values(cartItems);
    
    // Format for API payload
    const apiFormattedItems = cartItemsArray.map(item => ({
      item: item.name || item.itemName || item.itemId, // Item name
      category: item.category || 'general',
      service: item.service, // Service name
      quantity: item.qty,    // Quantity
      price: item.price      // Price per item
    }));
    
    console.log("📡 API formatted items:", apiFormattedItems);
    return apiFormattedItems;
  }, [cartItems]);

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

  // Debug cart state
  useEffect(() => {
    console.log("📊 Cart state update:", {
      totalItems: Object.keys(cartItems || {}).length,
      formattedItems: formatCartItemsForDisplay,
      apiItems: formatCartItemsForAPI
    });
  }, [cartItems, formatCartItemsForDisplay, formatCartItemsForAPI]);

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

 const updateQuantity = (uniqueKey, change) => {
  console.log("🔄 Updating quantity:", { uniqueKey, change });
  
  if (change === 1) {
    dispatch(incrementQty(uniqueKey)); // Pass the actual Redux key
  } else {
    dispatch(decrementQty(uniqueKey)); // Pass the actual Redux key
  }
};

 const removeItem = uniqueKey => {
  console.log("🗑️ Removing item with key:", uniqueKey);
  dispatch(removeFromCart(uniqueKey));
};

  const showClearAllConfirmation = () => {
    // Only show confirmation if cart has items
    if (Object.keys(cartItems || {}).length > 0) {
      setConfirmationModalVisible(true);
    }
  };

  const clearAllItems = () => {
    dispatch(clearCart());
    setConfirmationModalVisible(false);
  };

  // Calculate totals
  const { subtotal, total } = useMemo(() => {
    let calculatedSubtotal = 0;
    
    if (cartItems && typeof cartItems === 'object') {
      Object.values(cartItems).forEach(item => {
        calculatedSubtotal += (item.price || 0) * (item.qty || 0);
      });
    }
    
    return {
      subtotal: calculatedSubtotal.toFixed(2),
      total: calculatedSubtotal.toFixed(2) // No delivery fee for now
    };
  }, [cartItems]);

  const totals = {
    subtotal: subtotal,
    total: total,
  };

  const handleBookPickup = () => {
    // Validate cart has items
    const apiFormattedItems = formatCartItemsForAPI;
    if (apiFormattedItems.length === 0) {
      setTooltipText('Your cart is empty. Please add items first.');
      setTooltipVisible(true);
      return;
    }
    
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

      // Format pickup date
      const formattedPickupDate = selectedPickupDate.toISOString().split('T')[0];
      const formattedDeliveryDate = selectedDropDate 
        ? selectedDropDate.toISOString().split('T')[0] 
        : calculateDeliveryDate(selectedPickupDate).toISOString().split('T')[0];
      
      console.log("📦 Navigating to UserDetailsScreen with:", {
        vendorId,
        orderItems: apiFormattedItems,
        totalPrice: parseFloat(total)
      });
      
      navigation.navigate('UserDetailsScreen', {
        vendorId: vendorId,
        pickupDate: formattedPickupDate,
        selectedDropDate: formattedDeliveryDate,
        pickupSlot: selectedPickupSlot.time,
        deliveryTime: selectedDropSlot ? selectedDropSlot.time : timeSlots[2]?.time,
        paymentMethod: selectedPayment,
        note: orderNote,
        address: selectedAddress,
        orderItems: apiFormattedItems, // Pass API-formatted items
        totalPrice: parseFloat(total),
        tooltipVisible: tooltipVisible,
      });
    } else {
      // Show schedule options
      setShowScheduleOptions(true);
    }
  };

  const handlePlaceOrderNow = () => {
    // Validate cart has items
    const apiFormattedItems = formatCartItemsForAPI;
    
    if (apiFormattedItems.length === 0) {
      setTooltipText('Your cart is empty. Please add items first.');
      setTooltipVisible(true);
      return;
    }
    
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
    
    // Calculate delivery date (2 days later)
    const deliveryDate = calculateDeliveryDate(now);
    
    console.log("🚀 Place order now with items:", apiFormattedItems);

    navigation.navigate('UserDetailsScreen', {
      vendorId: vendorId,
      pickupDate: now.toISOString().split('T')[0], // Today's date
      pickupTime: closestSlot.time,
      selectedDropDate: deliveryDate.toISOString().split('T')[0],
      deliveryTime: timeSlots[2]?.time || '10:00 AM - 12:00 PM',
      paymentMethod: selectedPayment,
      note: orderNote,
      address: selectedAddress,
      orderItems: apiFormattedItems, // Pass API-formatted items
      totalPrice: parseFloat(total),
      tooltipVisible: tooltipVisible,
    });
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

  const handleBrowseServices = () => {
    navigation.navigate('Main');
  };

  // Check if cart is empty
  const isCartEmpty = formatCartItemsForDisplay.length === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: appColors.background }}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />  
      <View style={styles.container}>
        {/* Header */}
        <View style={{ backgroundColor: appColors.darkBlue, paddingBottom: 10 }}>
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

        {isCartEmpty ? (
          <EmptyCart onBrowseServices={handleBrowseServices} />
        ) : (
          <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
          >
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

            <View style={[styles.section, { paddingVertical: 4 }]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={[styles.sectionTitle, { marginHorizontal: 10 }]}>
                  Order Items ({formatCartItemsForDisplay.length})
                </Text>
                <TouchableOpacity
                  onPress={showClearAllConfirmation}
                  style={styles.clearAllButton}
                >
                  <Icon name="delete" size={18} color="#e53935" />
                </TouchableOpacity>
              </View>

            {formatCartItemsForDisplay.map(item => (
  <OrderItem
    key={item.id} // Use the unique key as React key
    item={item}
    onUpdateQuantity={(change) => updateQuantity(item.uniqueKey, change)} // Pass uniqueKey
    onRemoveItem={() => removeItem(item.uniqueKey)} // Pass uniqueKey
    category={item.category}
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
              <View style={[styles.priceRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  ₹{totals.total}
                </Text>
              </View>
            </View>
            
            {!isCartEmpty && (
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