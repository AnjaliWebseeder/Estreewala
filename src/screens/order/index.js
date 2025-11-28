import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator,StatusBar } from "react-native";
import { styles } from "./styles";
import FastImage from "react-native-fast-image";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { service1, service2, service3, service4 } from "../../utils/images/images";
import Header from "../../components/header";
import appColors from "../../theme/appColors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersByStatus, addNewOrder, refreshOrders, updateOrderStatus } from "../../redux/slices/myOrderSlice";
import { useSocket } from "../../utils/context/socketContext";
import { useToast } from "../../utils/context/toastContext";
import moment from "moment-timezone";

// Default images for vendors
const defaultServiceImages = [service1, service2, service3, service4];

const OrdersScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState("active");
  const [hasLoadedTabs, setHasLoadedTabs] = useState({
    scheduled: false,
    active: false,
    completed: false
  });
  const dispatch = useDispatch();
  const { socket, isConnected } = useSocket();
  const { showToast } = useToast();
  
  // Get orders from Redux store
  const {
    pendingOrders,
    acceptedOrders,
    rejectedOrders,
    completedOrders,
    pendingLoading,
    acceptedLoading,
    completedLoading
  } = useSelector(state => state.myOrder);

  const tabs = [
    { id: "active", label: "Active Orders" },
    { id: "scheduled", label: "Scheduled" },
    { id: "completed", label: "Past Orders" },
  ];

  // Track initial load
  const initialLoadRef = useRef(true);

  // 🔥 REAL-TIME ORDER UPDATES - Listen for order updates via WebSocket
  useEffect(() => {
    if (!socket) {
      console.log('❌ No socket available for order updates');
      return;
    }

    console.log('🎯 Setting up order-update listener...');

    // Listen for order status updates from backend
    const handleOrderUpdate = (data) => {
      console.log('📦 Real-time order update received:', data);
      
      // Update order in Redux store
      dispatch(updateOrderStatus({
        orderId: data.orderId,
        status: data.status,
        reason: data.reason,
        updatedAt: data.updatedAt
      }));

      // Show notification to user
    
    };

    socket.on('order-update', handleOrderUpdate);

    // Cleanup listener when component unmounts
    return () => {
      if (socket) {
        socket.off('order-update', handleOrderUpdate);
        console.log('🧹 Cleaned up order-update listener');
      }
    };
  }, [socket, dispatch, showToast]);



  // Check for newly created order from route params
  useEffect(() => {
    if (route.params?.newOrder) {
      const newOrder = route.params.newOrder;
      console.log('🎉 New order received in OrdersScreen:', newOrder);
      dispatch(addNewOrder(newOrder));
      
      // Clear the route params to avoid adding duplicate
      navigation.setParams({ newOrder: null });
      
      // Switch to the appropriate tab based on order status
      if (newOrder.status === 'pending') {
        setActiveTab('scheduled');
        setHasLoadedTabs(prev => ({ ...prev, scheduled: true }));
      } else if (newOrder.status === 'accepted') {
        setActiveTab('active');
        setHasLoadedTabs(prev => ({ ...prev, active: true }));
      }
    }
  }, [route.params?.newOrder, dispatch, navigation]);

  // Initial load - fetch all tabs data when component mounts
  useEffect(() => {
    if (initialLoadRef.current) {
      console.log('🚀 Initial load - fetching all tabs data');
      fetchAllTabsData();
      initialLoadRef.current = false;
    }
  }, []);

  // Fetch data for all tabs initially
  const fetchAllTabsData = () => {
    dispatch(getOrdersByStatus('pending'));
    dispatch(getOrdersByStatus('accepted'));
    dispatch(getOrdersByStatus('completed'));
    
    // Mark all tabs as loaded
    setHasLoadedTabs({
      scheduled: true,
      active: true,
      completed: true
    });
  };

  // Smart tab switching - only fetch if not already loaded
  const handleTabPress = (tabId) => {
    console.log(`🔄 Switching to tab: ${tabId}`);
    setActiveTab(tabId);
    
    // Only fetch if this tab hasn't been loaded yet
    if (!hasLoadedTabs[tabId]) {
      console.log(`📥 First time loading tab: ${tabId}`);
      fetchOrdersForTab(tabId);
      setHasLoadedTabs(prev => ({ ...prev, [tabId]: true }));
    } else {
      console.log(`✅ Tab ${tabId} already loaded, using cached data`);
    }
  };

  // Fetch orders for specific tab
  const fetchOrdersForTab = (tabId) => {
    console.log(`📡 Fetching orders for tab: ${tabId}`);
    switch (tabId) {
      case "scheduled":
        dispatch(getOrdersByStatus('pending'));
        break;
      case "active":
        dispatch(getOrdersByStatus('accepted'));
        break;
      case "completed":
        dispatch(getOrdersByStatus('completed'));
        break;
    }
  };

  // Fetch orders for current tab (with optional force refresh)
  const fetchOrdersForCurrentTab = (forceRefresh = false) => {
    if (forceRefresh) {
      console.log(`🔄 Force refreshing tab: ${activeTab}`);
      fetchOrdersForTab(activeTab);
    } else if (!hasLoadedTabs[activeTab]) {
      console.log(`📥 Loading tab for first time: ${activeTab}`);
      fetchOrdersForTab(activeTab);
      setHasLoadedTabs(prev => ({ ...prev, [activeTab]: true }));
    }
  };

  // Enhanced refresh function
  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered for tab:', activeTab);
    fetchOrdersForTab(activeTab); // Always fetch fresh data on manual refresh
  };

  // Transform API data to match existing UI structure
  const transformOrderData = (order) => {
    const randomImage = defaultServiceImages[Math.floor(Math.random() * defaultServiceImages.length)];
    const totalItems = order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

    // ✅ Determine status display
    let statusDisplay, statusColor, textColor, progress;

    switch (order.status) {
      case "pending":
        statusDisplay = "SCHEDULED";
        statusColor = "#e3f2fd";
        textColor = "#1976d2";
        break;
      case "accepted":
        statusDisplay = "ACCEPTED";
        statusColor = "#e8f5e8";
        textColor = "#2e7d32";
        progress = "Vendor preparing your order";
        break;
      case "preparing":
        statusDisplay = "PREPARING";
        statusColor = "#fff3e0";
        textColor = "#f57c00";
        progress = "Vendor is preparing your order";
        break;
      case "ready":
        statusDisplay = "READY";
        statusColor = "#e8f5e8";
        textColor = "#2e7d32";
        progress = "Ready for pickup";
        break;
      case "picked_up":
        statusDisplay = "PICKED UP";
        statusColor = "#e3f2fd";
        textColor = "#1976d2";
        progress = "Driver picked up your order";
        break;
      case "on_the_way":
        statusDisplay = "ON THE WAY";
        statusColor = "#fff3e0";
        textColor = "#f57c00";
        progress = "Order is on the way";
        break;
      case "delivered":
        statusDisplay = "DELIVERED";
        statusColor = appColors.lightCream;
        textColor = "#a0a1a5";
        break;
      case "rejected":
        statusDisplay = "REJECTED";
        statusColor = "#ffebee";
        textColor = "#c62828";
        break;
      case "cancelled":
        statusDisplay = "CANCELLED";
        statusColor = "#ffebee";
        textColor = "#c62828";
        break;
      default:
        statusDisplay = order.status?.toUpperCase() || "PENDING";
        statusColor = "#e3f2fd";
        textColor = "#1976d2";
    }

    return {
      id: order.id || order._id,
      title: order.vendor?.businessName || "Unknown Vendor",
      orderId: (order.id || order._id || '').slice(-8).toUpperCase(),
      items: `${totalItems} item${totalItems > 1 ? "s" : ""}`,
      price: (order.totalAmount / 100).toFixed(2),
      status: statusDisplay,
      statusColor,
      textColor,
      image: randomImage,
      progress,
      originalData: order,
    };
  };

  const getOrdersForTab = () => {
    let orders = [];
    switch (activeTab) {
      case "scheduled":
        orders = pendingOrders;
        break;
      case "active":
        orders = acceptedOrders;
        break;
      case "completed":
        orders = completedOrders;
        break;
      default:
        orders = [];
    }
    
    // Sort orders by creation date (newest first)
    const sortedOrders = [...orders].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    return sortedOrders.map(transformOrderData);
  };

  // Smart loading - only show loader for initial load of each tab
  const isLoading = () => {
    // If tab hasn't been loaded yet, show loading
    if (!hasLoadedTabs[activeTab]) {
      return true;
    }

    // Otherwise, use the specific loading state
    switch (activeTab) {
      case "scheduled":
        return pendingLoading;
      case "active":
        return acceptedLoading;
      case "completed":
        return completedLoading;
      default:
        return false;
    }
  };

  const renderItem = ({ item }) => {
    const formattedPickupDate = moment(item.originalData.pickupDate).format("DD MMM YYYY");
    const formattedDeliveryDate = moment(item?.originalData?.deliveryDate).format("DD MMM YYYY");
    
    return (
      <TouchableOpacity 
        onPress={() => navigation.navigate('OrderDetails', { order: item.originalData })} 
        style={styles.card}
      >
        <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
          <FastImage source={item.image} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.title}>{item.title}</Text>

            <View style={styles.row}>
              <Text style={styles.subText}>Order ID {item.orderId}</Text>
              <Text style={styles.date}>
                {moment(item?.originalData?.createdAt).utcOffset("+05:30").format("DD MMM, hh:mm A")}
              </Text>
            </View>

            {/* Order Status Badge */}
            <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
              <Text style={[styles.statusText, { color: item.textColor }]}>
                {item.status}
              </Text>
            </View>

            {/* Progress Text */}
            {item.progress && (
              <Text style={styles.progressText}>{item.progress}</Text>
            )}

            {/* Scheduled Info */}
            <View style={styles.scheduledInfo}>
              <MaterialIcons name="schedule" size={14} color={appColors.blue} />
              <Text style={styles.scheduledText}>
                Pickup: {formattedPickupDate} {item?.originalData?.pickupTime}
              </Text>
            </View>
            <View style={styles.scheduledInfo}>
              <MaterialIcons name="local-shipping" size={14} color={appColors.blue} />
              <Text style={styles.scheduledText}>
                Delivery: {formattedDeliveryDate} {item?.originalData?.deliveryTime}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.border} />

        <View style={[styles.row, { paddingHorizontal: 16 }]}>
          <View style={styles.row}>
            <Text style={styles.subText}>
              {item?.originalData?.items?.length} Item{item?.originalData?.items?.length !== 1 ? 's' : ''}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="rupee" style={{ marginTop: 3 }} size={14} color="#8E8E93" />
            <Text style={[styles.subText, { marginLeft: 4 }]}>{item?.originalData?.totalAmount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    if (isLoading()) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={appColors.blue} />
          <Text style={styles.emptyText}>Loading orders...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="inbox" size={60} color="#ddd" />
        <Text style={styles.emptyText}>
          No {activeTab === 'scheduled' ? 'scheduled' : activeTab === 'active' ? 'active' : 'past'} orders
        </Text>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Tap to refresh</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.main}>
          <Header 
            iconColor={appColors.white} 
            titleStyle={{color:appColors.white}} 
            title={"My Orders"} 
            onBackPress={() => navigation.goBack()} 
          />
        
          <View style={styles.tabContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={styles.tab}
                onPress={() => handleTabPress(tab.id)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab.id && styles.activeTabText,
                  ]}
                >
                  {tab.label}
                </Text>

                {activeTab === tab.id && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          data={getOrdersForTab()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          refreshing={isLoading()}
          onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrdersScreen;