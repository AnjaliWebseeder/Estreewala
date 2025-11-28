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
  
  console.log("🎯 VENDOR ID RECEIVED:", vendorId,address);

  const cart = useSelector(state => state.cart.items);
  const { vendorCatalog, vendorCatalogLoading, vendorCatalogError } =
    useSelector(state => state.nearByVendor);


   const parts = address?.split(',').map(s => s.trim());
  const area = parts?.length > 1 ? parts[1] : parts[0];

  console.log("📦 vendor catalog raw data:", vendorCatalog);

  // ✅ FIX: Better data transformation with comprehensive logging
  const transformedCatalog = React.useMemo(() => {
    if (!vendorCatalog?.catalog) {
      console.log("📭 No catalog data available yet");
      return {};
    }
    
    console.log("🔄 Starting catalog transformation...");
    const transformed = transformCatalogData(vendorCatalog.catalog);
    
    console.log("✅ Transformed catalog structure:", {
      keys: Object.keys(transformed),
      hasData: Object.keys(transformed).length > 0,
      sample: Object.keys(transformed).length > 0 ? transformed[Object.keys(transformed)[0]] : 'No data'
    });
    
    return transformed;
  }, [vendorCatalog]);

  const catalog = transformedCatalog || {};

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    if (vendorId) {
      console.log("🔄 Fetching catalog for vendor:", vendorId);
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

  // ✅ FIX: Get ALL service categories with better error handling
  const serviceCategories = Object.keys(catalog);
  console.log("🔧 Available service categories:", serviceCategories);

  // ✅ FIX: Set selected service category only when categories are available
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('');
  
  useEffect(() => {
    if (serviceCategories.length > 0 && !selectedServiceCategory) {
      console.log("🎯 Setting initial service category:", serviceCategories[0]);
      setSelectedServiceCategory(serviceCategories[0]);
    }
  }, [serviceCategories, selectedServiceCategory]);

  console.log("🎯 Current selectedServiceCategory:", selectedServiceCategory);

  const [selectedService, setSelectedService] = useState({});

  // ✅ FIX: Get category data with fallback
  const selectedCategoryData = selectedServiceCategory ? (catalog[selectedServiceCategory] || {}) : {};
  console.log("📊 Selected category data:", selectedCategoryData);
  console.log("📊 Selected category data keys:", Object.keys(selectedCategoryData));

  // ✅ FIX: Build dynamic CATEGORIES with better empty state handling
  const availableCategoryKeys = Object.keys(selectedCategoryData);
  console.log("👕 Available category keys:", availableCategoryKeys);
  
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
          : k.charAt(0).toUpperCase() + k.slice(1), // Capitalize first letter
      value: k,
    })),
  ];

  console.log("🏷️ Dynamic categories:", dynamicCategories);

  // ✅ FIX: Improved product selection logic with comprehensive logging
  const selectedProducts = React.useMemo(() => {
    // Don't proceed if no service category is selected
    if (!selectedServiceCategory || availableCategoryKeys.length === 0) {
      console.log("⏳ Waiting for service category or category keys...");
      return [];
    }

    let products = [];

    if (category === 'all') {
      // Get products from ALL categories in the selected service
      products = availableCategoryKeys.flatMap(key => {
        const categoryProducts = selectedCategoryData[key] || [];
        console.log(`📦 Category "${key}" has ${categoryProducts.length} products`);
        
        return categoryProducts.map(product => ({
          ...product,
          category: key,
          serviceCategory: selectedServiceCategory
        }));
      });
    } else {
      // Get products from specific category
      const categoryProducts = selectedCategoryData[category] || [];
      console.log(`📦 Specific category "${category}" has ${categoryProducts.length} products`);
      
      products = categoryProducts.map(product => ({
        ...product,
        category: category,
        serviceCategory: selectedServiceCategory
      }));
    }

    console.log("🛍️ FINAL selected products:", {
      count: products.length,
      categories: [...new Set(products.map(p => p.category))],
      items: products.map(p => p.item)
    });
    
    return products;
  }, [category, selectedServiceCategory, selectedCategoryData, availableCategoryKeys]);

  console.log("🎯 FINAL selectedProducts count:", selectedProducts.length);

  const dynamicServices = serviceCategories?.map(s => ({
    label: s,
    value: s,
  }));

  console.log("🔄 Dynamic services:", dynamicServices);

  // ✅ FIX: Debug catalog structure when it loads
  useEffect(() => {
    if (Object.keys(catalog).length > 0) {
      console.log("=== CATALOG STRUCTURE DEBUG ===");
      Object.keys(catalog).forEach(serviceKey => {
        console.log(`Service: ${serviceKey}`, {
          categories: Object.keys(catalog[serviceKey] || {}),
          totalProducts: Object.values(catalog[serviceKey] || {}).flat().length
        });
      });
      console.log("=== END DEBUG ===");
    }
  }, [catalog]);

  // ✅ FIXED: useCallback to prevent unnecessary re-renders
  const getPriceForServiceAndItem = useCallback((serviceName, itemName, category) => {
    console.log('🔍 Looking up price:', { serviceName, itemName, category });
    
    if (!catalog[serviceName] || !catalog[serviceName][category]) {
      console.log('❌ Service or category not found in catalog');
      return 0;
    }
    
    const categoryItems = catalog[serviceName][category];
    const item = categoryItems.find(product => 
      product.item.toLowerCase() === itemName.toLowerCase()
    );
    
    if (!item) {
      console.log('❌ Item not found in category');
      return 0;
    }
    
    console.log('✅ Price found:', item.price);
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
      console.log('✅ Initialized services for', Object.keys(initialService).length, 'products');
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
    
    console.log('🛒 Adding to cart:', product.item);
    
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
    console.log(`🟢 Changing service for ${itemId} → ${serviceValue}`);
    
    const newPrice = getPriceForServiceAndItem(serviceValue, itemId, category);
    
    console.log(`💰 New price for ${itemId}: ${newPrice}`);
    
    setSelectedService(prev => ({
      ...prev,
      [itemId]: {
        service: serviceValue,
        price: newPrice
      },
    }));

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
    
    const serviceInfo = selectedService[itemId];
    if (serviceInfo) {
      return serviceInfo.price;
    }
    
    const defaultService = serviceCategories?.[0] || '';
    return getPriceForServiceAndItem(defaultService, itemId, category);
  }, [cart, selectedService, serviceCategories, getPriceForServiceAndItem]);

  // ✅ FIXED: Memoized render item to prevent unnecessary re-renders
  const renderProductItem = useCallback(({ item }) => {
    const currentService = selectedService[item.item]?.service || serviceCategories?.[0] || '';
    const currentPrice = getCurrentPriceForItem(item.item, item.category);
    
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

  // ✅ FIX: Improved loading and empty states
  const renderContent = () => {
    if (vendorCatalogLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={appColors.darkBlue} />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      );
    }

    if (vendorCatalogError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{vendorCatalogError}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => vendorId && dispatch(getVendorCatalog(vendorId))}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // ✅ FIX: Show empty state only when catalog is loaded but no products
    if (!vendorCatalogLoading && selectedProducts.length === 0 && Object.keys(catalog).length > 0) {
      return (
        <View style={styles.emptyContainer}>
          <Icon name="inventory" size={50} color={appColors.lightGray} />
          <Text style={styles.emptyText}>No products available</Text>
        </View>
      );
    }

    // ✅ FIX: Show initial loading while waiting for service category to be set
    if (!selectedServiceCategory && Object.keys(catalog).length > 0) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={appColors.darkBlue} />
          <Text style={styles.loadingText}>Preparing products...</Text>
        </View>
      );
    }

    // Show products when available
    return (
      <FlatList
        data={selectedProducts}
        keyExtractor={(item, index) => `${item.item}_${index}`}
        renderItem={renderProductItem}
        contentContainerStyle={{ paddingBottom: windowHeight(70) }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />  
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

      {renderContent()}

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