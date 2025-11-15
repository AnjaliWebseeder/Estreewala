import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import ProductItem from './productItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/header';
import { styles } from './styles';
import fonts from '../../../theme/appFonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import appColors from '../../../theme/appColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {  windowHeight } from '../../../theme/appConstant';
import FilterIcon from '../../../assets/Icons/svg/filter';
import { useDispatch, useSelector } from 'react-redux';
import { getVendorCatalog } from '../../../redux/slices/nearByVendor';
import {
  addToCart,
  changeService,
  decrementQty,
  incrementQty,
} from '../../../redux/slices/cartSlice';
import { clearCart } from '../../../redux/slices/cartSlice';
import { transformCatalogData } from "../../../utils/data/imageMapping"
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LaundryScreen({ navigation, route }) {
  const { title, vendorId, address } = route.params || {};
  const dispatch = useDispatch();
  
  console.log("VENDOR ID IS", vendorId);

  const cart = useSelector(state => state.cart.items);
  const { vendorCatalog, vendorCatalogLoading, vendorCatalogError } =
    useSelector(state => state.nearByVendor);
  
  const parts = address?.split(',').map(s => s.trim());
  const area = parts?.length > 1 ? parts[1] : parts[0];

  console.log("vendor catalog is===================>", vendorCatalog);

  // Transform catalog data to include images
  const transformedCatalog = transformCatalogData(vendorCatalog?.catalog);
  console.log("🔄 transformedCatalog:", transformedCatalog);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    if (vendorId) {
      dispatch(getVendorCatalog(vendorId));
    }
  }, [vendorId, dispatch]);

  const [category, setCategory] = useState('all');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
  const filterIconRef = useRef(null);
  const insets = useSafeAreaInsets();

  const catalog = transformedCatalog || {};
  const serviceCategories = Object.keys(catalog);
  
  console.log("🔧 serviceCategories:", serviceCategories);
  console.log("🔧 catalog keys:", Object.keys(catalog));

  const [selectedServiceCategory, setSelectedServiceCategory] = useState(
    serviceCategories?.[0] || '',
  );

  console.log("🎯 selectedServiceCategory:", selectedServiceCategory);

  const [selectedService, setSelectedService] = useState({});

  const selectedCategoryData = catalog[selectedServiceCategory] || {};
  
  console.log("📊 selectedCategoryData:", selectedCategoryData);
  console.log("📊 selectedCategoryData keys:", Object.keys(selectedCategoryData));

  // Build dynamic CATEGORIES based on keys available
  const availableCategoryKeys = Object.keys(selectedCategoryData);
  console.log("👕 availableCategoryKeys:", availableCategoryKeys);
  
  const dynamicCategories = [
    { label: 'All', value: 'all' },
    ...availableCategoryKeys.map(k => ({
      label:
        k === 'man'
          ? "Men's Wear"
          : k === 'woman'
          ? "Women's Wear"
          : k === 'kids'
          ? 'Kids Wear'
          : k,
      value: k,
    })),
  ];

  console.log("🏷️ dynamicCategories:", dynamicCategories);

  // Get products based on selected category - FIXED THIS PART
  const selectedProducts = React.useMemo(() => {
    if (category === 'all') {
      const allProducts = availableCategoryKeys.flatMap(key => {
        const categoryProducts = selectedCategoryData[key] || [];
        console.log(`📦 Category ${key} products:`, categoryProducts);
        return categoryProducts.map(product => ({
          ...product,
          category: key
        }));
      });
      console.log("🛍️ All selectedProducts:", allProducts);
      return allProducts;
    } else {
      const categoryProducts = (selectedCategoryData?.[category] || []).map(product => ({
        ...product,
        category: category
      }));
      console.log(`🛍️ ${category} selectedProducts:`, categoryProducts);
      return categoryProducts;
    }
  }, [category, selectedCategoryData, availableCategoryKeys]);

  console.log("🎯 FINAL selectedProducts:", selectedProducts);
  console.log("🎯 selectedProducts length:", selectedProducts.length);

  const dynamicServices = serviceCategories?.map(s => ({
    label: s,
    value: s,
  }));

  console.log("🔄 dynamicServices:", dynamicServices);

  // Debug: Check what's in the first service category
  useEffect(() => {
    if (serviceCategories.length > 0) {
      const firstService = serviceCategories[0];
      console.log(`🔍 First service (${firstService}) data:`, catalog[firstService]);
      console.log(`🔍 First service categories:`, Object.keys(catalog[firstService] || {}));
    }
  }, [serviceCategories, catalog]);

  // ✅ FIXED: useCallback to prevent unnecessary re-renders
  const getPriceForServiceAndItem = useCallback((serviceName, itemName, category) => {
    console.log('🔍 Looking up price:', { serviceName, itemName, category });
    
    if (!catalog[serviceName] || !catalog[serviceName][category]) {
      console.log('❌ Service or category not found:', { 
        serviceName, 
        category, 
        availableServices: Object.keys(catalog),
        availableCategories: catalog[serviceName] ? Object.keys(catalog[serviceName]) : 'No service'
      });
      return 0;
    }
    
    const categoryItems = catalog[serviceName][category];
    const item = categoryItems.find(product => 
      product.item.toLowerCase() === itemName.toLowerCase()
    );
    
    if (!item) {
      console.log('❌ Item not found in category:', {
        itemName,
        category,
        availableItems: categoryItems.map(i => i.item)
      });
      return 0;
    }
    
    console.log('✅ Price found:', { itemName, serviceName, category, price: item.price });
    return item.price;
  }, [catalog]);

  // ✅ FIXED: Initialize selectedService only when catalog data is ready
  useEffect(() => {
    if (selectedProducts?.length > 0 && serviceCategories?.length > 0 && Object.keys(selectedService).length === 0) {
      console.log('🔄 Initializing selectedService state...');
      const defaultService = serviceCategories[0];
      const initialService = {};
      
      selectedProducts.forEach(product => {
        const price = getPriceForServiceAndItem(
          defaultService, 
          product.item, 
          product.category
        );
        initialService[product.item] = {
          service: defaultService,
          price: price
        };
      });
      
      setSelectedService(initialService);
      console.log('✅ Initialized services with prices:', initialService);
    }
  }, [selectedProducts, serviceCategories, getPriceForServiceAndItem, selectedService]);

  const handleFilterPress = () => {
    if (filterIconRef.current) {
      filterIconRef.current.measureInWindow((x, y, width, height) => {
        setDropdownPosition({
          top: y + height + 5,
          left: x + width - 160,
        });
        setShowDropdown(true);
      });
    }
  };

  // ✅ FIXED: Handle add to cart
  const handleAdd = useCallback((product) => {
    const currentService = selectedService[product.item]?.service || serviceCategories?.[0] || '';
    const price = getPriceForServiceAndItem(
      currentService, 
      product.item, 
      product.category
    );
    
    console.log('🛒 Adding to cart:', {
      item: product.item,
      service: currentService,
      price: price,
      category: product.category
    });
    
    dispatch(
      addToCart({ 
        id: product.item, 
        service: currentService, 
        price: price,
        name: product.item,
        image: product.image,
        category: product.category
      }),
    );
  }, [selectedService, serviceCategories, getPriceForServiceAndItem, dispatch]);

  const handleIncrement = useCallback((id) => {
    dispatch(incrementQty(id));
  }, [dispatch]);

  const handleDecrement = useCallback((id) => {
    dispatch(decrementQty(id));
  }, [dispatch]);

  // ✅ FIXED: Handle service change with price update
  const handleChangeService = useCallback((itemId, serviceValue, category) => {
    console.log(`🟢 Changing service for ${itemId} → ${serviceValue} in category: ${category}`);
    
    // Get the new price for this service and category
    const newPrice = getPriceForServiceAndItem(serviceValue, itemId, category);
    
    console.log(`💰 New price for ${itemId}: ${newPrice}`);
    
    // Update local state
    setSelectedService(prev => ({
      ...prev,
      [itemId]: {
        service: serviceValue,
        price: newPrice
      },
    }));

    // Update Redux store with new service AND price
    dispatch(changeService({ 
      id: itemId, 
      service: serviceValue,
      price: newPrice,
      category: category
    }));
  }, [getPriceForServiceAndItem, dispatch]);

  const handleCategorySelect = value => {
    console.log("🎯 Category selected:", value);
    setCategory(value);
    setShowDropdown(false);
  };

  const cartItems = Object.keys(cart)?.map(k => ({ id: k, ...cart[k] }));

  // Calculate totals
  const totalItems = cartItems.reduce((sum, it) => sum + it.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.qty);
  }, 0);

  // ✅ FIXED: Get current price for display in ProductItem
  const getCurrentPriceForItem = useCallback((itemId, category) => {
    const cartItem = cart[itemId];
    if (cartItem) {
      return cartItem.price;
    }
    
    // If not in cart, get from selectedService or default
    const serviceInfo = selectedService[itemId];
    if (serviceInfo) {
      return serviceInfo.price;
    }
    
    // Fallback: get price from default service
    const defaultService = serviceCategories?.[0] || '';
    return getPriceForServiceAndItem(defaultService, itemId, category);
  }, [cart, selectedService, serviceCategories, getPriceForServiceAndItem]);

  // ✅ FIXED: Memoized render item to prevent unnecessary re-renders
  const renderProductItem = useCallback(({ item }) => {
    const currentService = selectedService[item.item]?.service || serviceCategories?.[0] || '';
    const currentPrice = getCurrentPriceForItem(item.item, item.category);
    
    console.log('📦 Rendering product:', {
      name: item.item,
      category: item.category,
      service: currentService,
      price: currentPrice
    });
    
    return (
      <ProductItem
        product={{
          id: item.item,
          name: item.item,
          price: currentPrice,
          image: item.image,
          category: item.category
        }}
        qty={cart[item.item]?.qty || 0}
        service={currentService}
        services={dynamicServices}
        onAdd={() => handleAdd(item)}
        onIncrement={() => handleIncrement(item.item)}
        onDecrement={() => handleDecrement(item.item)}
        onChangeService={(itemId, serviceValue) => {
          handleChangeService(itemId, serviceValue, item.category);
        }}
      />
    );
  }, [selectedService, serviceCategories, getCurrentPriceForItem, cart, dynamicServices, handleAdd, handleIncrement, handleDecrement, handleChangeService]);

 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Debug Info */}
     
      <View
        style={{
          backgroundColor: appColors.darkBlue,
          paddingBottom: 5,
          marginBottom: 20,
        }}
      >
        <Header
          iconColor={appColors.white}
          titleStyle={{ color: appColors.white }}
          containerStyle={{ paddingVertical: 10 }}
          onBackPress={() => navigation.goBack()}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ paddingRight: 50 }}>
            <View style={styles.header}>
              <Text style={styles.title}>
                {vendorCatalog?.vendor?.businessName || title || 'Laundry'}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: "flex-end" }}>
                <Ionicons name="location-outline" size={16} color="#555" style={{ marginRight: 6 }} />
                <Text style={styles.sub}>{area}</Text>
              </View>
            </View>
          </View>
       
          <TouchableOpacity
            ref={filterIconRef}
            style={styles.filterButton}
            onPress={handleFilterPress}
            activeOpacity={0.7}
          >
            <FilterIcon size={20} color={appColors.darkBlue} />
          </TouchableOpacity>
        </View>
        <View style={styles.dashedLine} />
        <View style={styles.metaRow}>
          <Text style={styles.meta}>⭐ 4.0</Text>
          <Text style={styles.meta}>🕒 9 AM - 11 PM</Text>
        </View>
      </View>

      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View
          style={[
            styles.dropdownContainer,
            { top: dropdownPosition.top, left: dropdownPosition.left },
          ]}
        >
          {dynamicCategories.map((cat, index) => (
            <View key={cat.value}>
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  category === cat.value && styles.dropdownItemSelected,
                ]}
                onPress={() => handleCategorySelect(cat.value)}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    category === cat.value && styles.dropdownItemTextSelected,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
              {index < dynamicCategories.length - 1 && (
                <View style={styles.dropdownDivider} />
              )}
            </View>
          ))}
        </View>
      </Modal>

      {vendorCatalogLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={appColors.darkBlue} />
        </View>
      ) : vendorCatalogError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{vendorCatalogError}</Text>
        </View>
      ) : selectedProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products available</Text>
        </View>
      ) : (
        <FlatList
          data={selectedProducts}
          keyExtractor={(item, index) => `${item.item}_${index}`}
          renderItem={renderProductItem}
          contentContainerStyle={{ paddingBottom: windowHeight(70) }}
        />
      )}

      {/* Bottom Cart Bar */}
      {totalItems > 0 && (
        <View style={[styles.cartBar, { marginBottom: insets.bottom || -4 }]}>
          <View>
            <Text style={styles.cartTitle}>
              {totalItems} Item{totalItems > 1 ? 's' : ''} •{' '}
              <Text style={{ fontFamily: fonts.InterRegular }}>
                <Icon name="currency-rupee" size={13} color={appColors.white} />
              </Text>
              {totalPrice.toFixed(2)}
            </Text>
            <Text style={styles.cartSub}>Extra charges may apply</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('LaundryCheckoutScreen', {
                laundryName: vendorCatalog?.vendor?.businessName || title || 'Laundry',
                vendorId: vendorId
              })
            }
            style={styles.cartBtn}
            activeOpacity={0.85}
          >
            <Text style={styles.cartBtnText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}