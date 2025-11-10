import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import FastImage from "react-native-fast-image";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { service1, service2, service3, service4 } from "../../utils/images/images";
import Header from "../../components/header";
import appColors from "../../theme/appColors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersByStatus, addNewOrder, refreshOrders } from "../../redux/slices/myOrderSlice"; // Import new actions
import moment from "moment";

// Default images for vendors
const defaultServiceImages = [service1, service2, service3, service4];

const OrdersScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState("active"); // active, scheduled, completed
  const dispatch = useDispatch();
  
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
      } else if (newOrder.status === 'accepted') {
        setActiveTab('active');
      }
    }
  }, [route.params?.newOrder]);

  // Fetch orders when component mounts and when tab changes
  useEffect(() => {
    fetchOrdersForCurrentTab();
  }, [activeTab]);

  const fetchOrdersForCurrentTab = () => {
    console.log(`🔄 Fetching orders for tab: ${activeTab}`);
    switch (activeTab) {
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

  // Enhanced refresh function
  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    // Force clear and refetch
    dispatch(refreshOrders());
    fetchOrdersForCurrentTab();
  };

  // Transform API data to match existing UI structure
  const transformOrderData = (order) => {
    const randomImage = defaultServiceImages[Math.floor(Math.random() * defaultServiceImages.length)];
    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Format dates
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    const scheduledDate = new Date(order.pickupDateTime);
    const isToday = new Date().toDateString() === scheduledDate.toDateString();
    const scheduledText = isToday 
      ? `Today, ${scheduledDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
      : `Tomorrow, ${scheduledDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    // Determine status display based on order status
    let statusDisplay, statusColor, textColor, progress;
    
    switch (order.status) {
      case 'pending':
        statusDisplay = "SCHEDULED";
        statusColor = "#e3f2fd";
        textColor = "#1976d2";
        break;
      case 'accepted':
        statusDisplay = "PICKUP";
        statusColor = "#fff3e0";
        textColor = "#f57c00";
        progress = "Driver on the way";
        break;
      case 'completed':
        statusDisplay = "COMPLETED";
        statusColor = appColors.lightCream;
        textColor = "#a0a1a5";
        break;
      default:
        statusDisplay = order.status.toUpperCase();
        statusColor = "#e3f2fd";
        textColor = "#1976d2";
    }

    return {
      id: order.id,
      title: order.vendor.businessName,
      orderId: order.id.slice(-8).toUpperCase(),
      date: formatDate(order.createdAt),
      scheduledDate: scheduledText,
      items: `${totalItems} item${totalItems > 1 ? 's' : ''}`,
      price: (order.totalAmount / 100).toFixed(2), // Assuming amount is in paisa
      status: statusDisplay,
      statusColor,
      textColor,
      image: randomImage,
      progress,
      originalData: order // Keep original data for details screen
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

  const isLoading = () => {
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

            {/* Scheduled Info */}
            <View style={styles.scheduledInfo}>
              <MaterialIcons name="schedule" size={14} color={appColors.blue} />
              <Text style={styles.scheduledText}>
                Pickup: {moment(item?.originalData?.pickupDateTime).utcOffset("+05:30").format("DD MMM hh:mm A")}
              </Text>
            </View>
            <View style={styles.scheduledInfo}>
              <MaterialIcons name="local-shipping" size={14} color={appColors.blue} />
              <Text style={styles.scheduledText}>
                Delivery: {moment(item?.originalData?.deliveryDateTime).utcOffset("+05:30").format("DD MMM hh:mm A")}
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
                onPress={() => setActiveTab(tab.id)}
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
          onRefresh={handleRefresh} // Use enhanced refresh
        />
      </View>
    </SafeAreaView>
  );
};

export default OrdersScreen;