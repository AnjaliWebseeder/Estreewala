import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDropdown from '../../../../components/dropdown';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';

export default function ProductItem({
  product,
  selectedServices = [],
  cartItems = [],
  onAdd,
  onIncrement,
  onDecrement,
  onChangeService,
  services = [],
}) {
  const dropdownRef = useRef(null);
  
  // Local state to track dropdown value
  const [dropdownSelectedService, setDropdownSelectedService] = useState('');
  const [isProcessing, setIsProcessing] = useState({}); // Track processing services

  // Reset dropdown when all services are removed
  useEffect(() => {
    if (selectedServices.length === 0) {
      setDropdownSelectedService('');
    } else if (dropdownSelectedService === '' && selectedServices.length > 0) {
      setDropdownSelectedService(selectedServices[0]);
    }
  }, [selectedServices, dropdownSelectedService]);

  // Get filtered cart items for this specific product and category
  const filteredCartItems = React.useMemo(() => {
    return cartItems.filter(cartItem => 
      cartItem.itemId === product.id && cartItem.category === product.category
    );
  }, [cartItems, product.id, product.category]);

  // Get quantity for specific service
  const getQtyForService = (serviceValue) => {
    const cartItem = filteredCartItems.find(item => item.service === serviceValue);
    return cartItem ? cartItem.qty : 0;
  };

  // ✅ FIXED: Handle increment with smoother UX
  const handleServiceIncrement = useCallback((serviceValue) => {
    if (!serviceValue || serviceValue === '') return;
    
    const cartItem = filteredCartItems.find(item => item.service === serviceValue);
    if (cartItem) {
      onIncrement(serviceValue);
    } else {
      onAdd(serviceValue);
    }
  }, [filteredCartItems, onIncrement, onAdd]);

  // ✅ FIXED: Handle decrement with smoother UX
  const handleServiceDecrement = useCallback((serviceValue) => {
    if (!serviceValue || serviceValue === '') return;
    
    const currentQty = getQtyForService(serviceValue);
    
    if (currentQty <= 1) {
      // Mark as processing to prevent blink
      setIsProcessing(prev => ({ ...prev, [serviceValue]: true }));
      
      // Remove from cart
      onDecrement(serviceValue);
      
      // Remove from selected services after a short delay
      setTimeout(() => {
        handleServiceToggle(serviceValue);
        // Remove processing state
        setIsProcessing(prev => ({ ...prev, [serviceValue]: false }));
      }, 100);
    } else {
      onDecrement(serviceValue);
    }
  }, [getQtyForService, onDecrement]);

  // Calculate total price
  const totalPriceForThisItem = React.useMemo(() => {
    return filteredCartItems
      .filter(item => selectedServices.includes(item.service))
      .reduce((sum, item) => sum + (item.price * item.qty), 0);
  }, [filteredCartItems, selectedServices]);

  // Get category display name
  const getCategoryDisplayName = () => {
    switch(product.category) {
      case 'man': return "Men's Wear";
      case 'woman': return "Women's Wear";
      case 'kids': return "Kids Wear";
      default: return product.category?.charAt(0)?.toUpperCase() + product.category?.slice(1) || 'General';
    }
  };

  // ✅ FIXED: Handle service removal WITHOUT waiting for cart
  const handleServiceToggle = useCallback((serviceValue) => {
    if (!serviceValue || serviceValue === '') return;
    
    // Mark as processing to prevent blink
    setIsProcessing(prev => ({ ...prev, [serviceValue]: true }));
    
    // Check if service is in cart
    const cartItem = filteredCartItems.find(item => item.service === serviceValue);
    
    // Remove from selected services FIRST (immediate UI update)
    onChangeService(product.id, serviceValue);
    
    // Then remove from cart if exists
   if (cartItem && cartItem.qty > 0) {
  for (let i = 0; i < cartItem.qty; i++) {
    onDecrement(serviceValue);   // Remove entire quantity instead of 1
  }
}
    
    // Clear processing state after a delay
    setTimeout(() => {
      setIsProcessing(prev => ({ ...prev, [serviceValue]: false }));
    }, 100);
  }, [filteredCartItems, onChangeService, product.id, onDecrement]);

  // ✅ FIXED: Auto-add service with better UX
  const handleDropdownChange = useCallback((option) => {
    const serviceValue = option?.value || option || '';
    
    if (!serviceValue || serviceValue === '') return;
    
    setDropdownSelectedService(serviceValue);
    
    const isAlreadySelected = selectedServices.includes(serviceValue);
    
    if (!isAlreadySelected) {
      // Mark as processing
      setIsProcessing(prev => ({ ...prev, [serviceValue]: true }));
      
      // 1. Add service to selected services
      onChangeService(product.id, serviceValue);
      
      // 2. AUTO-ADD to cart with quantity 1
      setTimeout(() => {
        onAdd(serviceValue);
        // Clear processing state
        setIsProcessing(prev => ({ ...prev, [serviceValue]: false }));
      }, 50);
    }
  }, [selectedServices, onChangeService, product.id, onAdd]);

  // Get service display name
  const getServiceDisplayName = (serviceValue) => {
    if (!serviceValue || serviceValue === '') return '';
    const serviceObj = services?.find(s => s.value === serviceValue);
    return serviceObj?.label || serviceValue || '';
  };

  // Get display service for dropdown
  const getDisplayService = () => {
    return dropdownSelectedService;
  };

  // Check if any service is selected
  const hasSelectedServices = selectedServices.length > 0;

  // Check if we should show item total
  const shouldShowItemTotal = totalPriceForThisItem > 0 && hasSelectedServices;

  return (
    <View style={styles.wrap}>
      <FastImage 
        source={product.image} 
        style={styles.img}
        resizeMode={FastImage.resizeMode.contain}
      />

      <View style={styles.info}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.categoryBadge}>
            {getCategoryDisplayName()}
          </Text>
        </View>
        
        {/* Service dropdown */}
        <View style={{ marginTop: 4 }}>
          <CustomDropdown
            ref={dropdownRef}
            options={services}
            value={getDisplayService()}
            onChange={handleDropdownChange}
            placeholder="Select Service"
          />
        </View>

        {/* Selected services */}
        {hasSelectedServices ? (
          <View style={{ margin: 4, marginTop: 6 }}>
            {selectedServices.map((serviceValue, index) => {
              const serviceName = getServiceDisplayName(serviceValue);
              const serviceQty = getQtyForService(serviceValue);
              const cartItem = filteredCartItems.find(item => item.service === serviceValue);
              const price = cartItem?.price || 0;
              const isServiceProcessing = isProcessing[serviceValue];
              
              return (
                <View 
                  key={`${product.id}_${serviceValue}_${index}`}
                  style={[
                    styles.serviceRow,
                    isServiceProcessing && styles.serviceRowProcessing
                  ]}
                >
                  {/* Service Info Container */}
                  <View style={styles.serviceInfoContainer}>
                    <View style={[
                      styles.serviceInfo,
              
                    ]}>
                      <Text style={[
                        styles.serviceName,
                      ]}>
                        {serviceName}
                      </Text>
                      
                      {/* Remove service button */}
                      <TouchableOpacity
                        style={[
                          styles.removeServiceButton,
                        ]}
                        onPress={() => handleServiceToggle(serviceValue)}
                        disabled={isServiceProcessing}
                      >
                        <Text style={styles.removeServiceText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                    
                    {/* Price display */}
                    {price > 0 && serviceQty > 0 && !isServiceProcessing && (
                      <Text style={styles.servicePrice}>₹{price} per item</Text>
                    )}
                  </View>
                  
                  {/* Counter for service - only if quantity > 0 and not processing */}
                  {serviceQty > 0 && !isServiceProcessing ? (
                    <View style={styles.serviceCounter}>
                      <TouchableOpacity 
                        style={styles.counterButton}
                        onPress={() => handleServiceDecrement(serviceValue)}
                      >
                        <Ionicons name="remove" size={14} color="#fff" />
                      </TouchableOpacity>
                      
                      <Text style={styles.serviceQty}>{serviceQty}</Text>
                      
                      <TouchableOpacity 
                        style={styles.counterButton}
                        onPress={() => handleServiceIncrement(serviceValue)}
                      >
                        <Ionicons name="add" size={14} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              );
            })}
          </View>
        ) : (
          /* Instruction when no services selected */
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              Select a service from dropdown
            </Text>
          </View>
        )}
        
        {/* Display item total */}
        {shouldShowItemTotal && (
          <View style={styles.itemTotalContainer}>
            <Text style={styles.totalLabel}>Item Total:</Text>
            <Text style={styles.totalPrice}>₹{totalPriceForThisItem.toFixed(2)}</Text>
          </View>
        )}
      </View>

      {/* Empty right container */}
      <View style={styles.right} />
    </View>
  );
}