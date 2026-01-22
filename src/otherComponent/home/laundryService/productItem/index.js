import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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

  // Dropdown value (ONLY user controlled)
  const [dropdownSelectedService, setDropdownSelectedService] = useState('');

  // Reset dropdown when all services removed
  useEffect(() => {
    if (selectedServices.length === 0) {
      setDropdownSelectedService('');
    }
  }, [selectedServices.length]);

  // Cart items for this product
  const filteredCartItems = useMemo(() => {
    return cartItems.filter(
      item =>
        item.itemId === product.id &&
        item.category === product.category
    );
  }, [cartItems, product.id, product.category]);

  // Quantity for a service
  const getQtyForService = useCallback(
    (serviceValue) => {
      const cartItem = filteredCartItems.find(
        item => item.service === serviceValue
      );
      return cartItem ? cartItem.qty : 0;
    },
    [filteredCartItems]
  );

  // Increment
  const handleServiceIncrement = useCallback(
    (serviceValue) => {
      if (!serviceValue) return;

      const qty = getQtyForService(serviceValue);
      if (qty > 0) {
        onIncrement(serviceValue);
      } else {
        onAdd(serviceValue);
      }
    },
    [getQtyForService, onIncrement, onAdd]
  );

  // Decrement
  const handleServiceDecrement = useCallback(
    (serviceValue) => {
      if (!serviceValue) return;

      const currentQty = getQtyForService(serviceValue);

      if (currentQty <= 1) {
        // Remove from cart
        onDecrement(serviceValue);
        // Remove from selected services
        onChangeService(product.id, serviceValue);
      } else {
        onDecrement(serviceValue);
      }
    },
    [getQtyForService, onDecrement, onChangeService, product.id]
  );

  // Remove service via ❌
  const handleServiceToggle = useCallback(
    (serviceValue) => {
      if (!serviceValue) return;

      const cartItem = filteredCartItems.find(
        item => item.service === serviceValue
      );

      // Remove from selected services
      onChangeService(product.id, serviceValue);

      // Remove full qty from cart
      if (cartItem?.qty) {
        for (let i = 0; i < cartItem.qty; i++) {
          onDecrement(serviceValue);
        }
      }
    },
    [filteredCartItems, onChangeService, product.id, onDecrement]
  );

  // Dropdown change
  const handleDropdownChange = useCallback(
    (option) => {
      const serviceValue = option?.value || option || '';
      if (!serviceValue) return;

      setDropdownSelectedService(serviceValue);

      if (!selectedServices.includes(serviceValue)) {
        onChangeService(product.id, serviceValue);
        onAdd(serviceValue);
      }
    },
    [selectedServices, onChangeService, onAdd, product.id]
  );

  // Total price
  const totalPriceForThisItem = useMemo(() => {
    return filteredCartItems
      .filter(item => selectedServices.includes(item.service))
      .reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [filteredCartItems, selectedServices]);

  const hasSelectedServices = selectedServices.length > 0;
  const shouldShowItemTotal =
    totalPriceForThisItem > 0 && hasSelectedServices;

  const getServiceDisplayName = (serviceValue) => {
    const serviceObj = services.find(s => s.value === serviceValue);
    return serviceObj?.label || serviceValue;
  };

  const getCategoryDisplayName = () => {
    switch (product.category) {
      case 'man':
        return "Men's Wear";
      case 'woman':
        return "Women's Wear";
      case 'kids':
        return "Kids Wear";
      default:
        return product.category?.charAt(0).toUpperCase() +
          product.category?.slice(1);
    }
  };

  return (
    <View style={styles.wrap}>
      <FastImage
        source={product.image}
        style={styles.img}
        resizeMode={FastImage.resizeMode.contain}
      />

      <View style={styles.info}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.categoryBadge}>
            {getCategoryDisplayName()}
          </Text>
        </View>

        {/* Dropdown */}
        <View style={{ marginTop: 4 }}>
          <CustomDropdown
            ref={dropdownRef}
            options={services}
            value={dropdownSelectedService}
            onChange={handleDropdownChange}
            placeholder="Select Service"
          />
        </View>

        {/* Selected services */}
        {hasSelectedServices ? (
          <View style={{ margin: 4, marginTop: 6 }}>
            {selectedServices.map(serviceValue => {
              const qty = getQtyForService(serviceValue);
              const cartItem = filteredCartItems.find(
                item => item.service === serviceValue
              );
              const price = cartItem?.price || 0;

              return (
                <View
                  key={`${product.id}_${serviceValue}`}
                  style={styles.serviceRow}
                >
                  <View style={styles.serviceInfoContainer}>
                    <View style={styles.serviceInfo}>
                      <Text style={styles.serviceName}>
                        {getServiceDisplayName(serviceValue)}
                      </Text>

                      <TouchableOpacity
                        style={styles.removeServiceButton}
                        onPress={() => handleServiceToggle(serviceValue)}
                      >
                        <Text style={styles.removeServiceText}>✕</Text>
                      </TouchableOpacity>
                    </View>

                    {price > 0 && qty > 0 && (
                      <Text style={styles.servicePrice}>
                        ₹{price} per item
                      </Text>
                    )}
                  </View>

                  {qty > 0 && (
                    <View style={styles.serviceCounter}>
                      <TouchableOpacity
                        style={styles.counterButton}
                        onPress={() => handleServiceDecrement(serviceValue)}
                      >
                        <Ionicons name="remove" size={14} color="#fff" />
                      </TouchableOpacity>

                      <Text style={styles.serviceQty}>{qty}</Text>

                      <TouchableOpacity
                        style={styles.counterButton}
                        onPress={() => handleServiceIncrement(serviceValue)}
                      >
                        <Ionicons name="add" size={14} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              Select a service from dropdown
            </Text>
          </View>
        )}

        {/* Item total */}
        {shouldShowItemTotal && (
          <View style={styles.itemTotalContainer}>
            <Text style={styles.totalLabel}>Item Total:</Text>
            <Text style={styles.totalPrice}>
              ₹{totalPriceForThisItem.toFixed(2)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.right} />
    </View>
  );
}
