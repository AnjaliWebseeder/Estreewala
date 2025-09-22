import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, SectionList } from "react-native";
import { styles } from "./styles";
import FastImage from "react-native-fast-image";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { service1, service2, service3, service4 } from "../../utils/images/images";
import Header from "../../components/header";
import appColors from "../../theme/appColors";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample data for different order types
const ordersData = {
  scheduled: [
    {
      id: "1",
      title: "QuickClean Laundry",
      orderId: "AD323453",
      date: "20 Jun, 10:20 AM",
      scheduledDate: "Today, 2:00 PM",
      items: "2 items",
      price: "13.00",
      status: "SCHEDULED",
      statusColor: "#e3f2fd",
      textColor: "#1976d2",
      image: service1,
    },
    {
      id: "2",
      title: "Sparkle Wash",
      orderId: "AD325854",
      date: "20 Jun, 09:02 AM",
      scheduledDate: "Tomorrow, 10:00 AM",
      items: "3 items",
      price: "28.00",
      status: "SCHEDULED",
      statusColor: "#e3f2fd",
      textColor: "#1976d2",
      image: service2,
    },
  ],
  active: [
    {
      id: "3",
      title: "FreshFold Express",
      orderId: "AD365247",
      date: "20 Jun, 08:36 AM",
      items: "4 items",
      price: "8.00",
      status: "PICKUP",
      statusColor: "#fff3e0",
      textColor: "#f57c00",
      image: service4,
      progress: "Driver on the way",
    },
    {
      id: "4",
      title: "UrbanWash Hub",
      orderId: "AD325843",
      date: "20 Jun, 09:02 AM",
      items: "3 items",
      price: "28.00",
      status: "WASHING",
      statusColor: "#e8f5e8",
      textColor: "#388e3c",
      image: service1,
      progress: "In progress",
    },
  ],
  completed: [
    {
      id: "5",
      title: "QuickClean Laundry",
      orderId: "AD32453",
      date: "18 Jun, 10:20 AM",
      items: "5 items",
      price: "17.00",
      status: "COMPLETED",
      statusColor: appColors.lightCream,
      textColor: "#a0a1a5",
      image: service3,
      rating: "5.0",
    },
    {
      id: "6",
      title: "Premium Laundry",
      orderId: "AD367891",
      date: "17 Jun, 03:45 PM",
      items: "2 items",
      price: "15.00",
      status: "COMPLETED",
      statusColor: appColors.lightCream,
      textColor: "#a0a1a5",
      image: service2,
      rating: "4.5",
    },
  ],
};

const OrdersScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("active"); // active, scheduled, completed

  const tabs = [
    { id: "active", label: "Active Orders" },
    { id: "scheduled", label: "Scheduled" },
    { id: "completed", label: "Past Orders" },
  ];

  const getOrdersForTab = () => {
    switch (activeTab) {
      case "scheduled":
        return ordersData.scheduled;
      case "active":
        return ordersData.active;
      case "completed":
        return ordersData.completed;
      default:
        return [];
    }
  };

  const renderItem = ({ item }) => {
    const isRating = item.rating;
    const isScheduled = activeTab === "scheduled";
    const isActive = activeTab === "active";

    return (
      <TouchableOpacity 
        onPress={() => navigation.navigate('OrderDetails', { order: item })} 
        style={styles.card}
      >
        <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
          <FastImage source={item.image} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.row}>
              <Text style={styles.subText}>Order ID {item.orderId}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            
            {isScheduled && (
              <View style={styles.scheduledInfo}>
                <MaterialIcons name="schedule" size={14} color={appColors.blue}/>
                <Text style={styles.scheduledText}>{item.scheduledDate}</Text>
              </View>
            )}
            
            {isActive && item.progress && (
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>{item.progress}</Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.border} />
        
        <View style={[styles.row, { paddingHorizontal: 16 }]}>
          <View style={styles.row}>
            <Text style={styles.subText}>{item.items}</Text>
            <View style={styles.dot} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="rupee" style={{ marginTop: 3 }} size={14} color="#8E8E93" />
              <Text style={[styles.subText, { marginLeft: 4 }]}>{item.price}</Text>
            </View>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
            {isRating ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="star" size={14} color={"#8E8E93"} style={{ marginBottom: 2 }} />
                <Text style={[styles.statusText, { color: item.textColor, marginLeft: 4 }]}>
                  {item.rating}
                </Text>
              </View>
            ) : (
              <Text style={[styles.statusText, { color: item.textColor }]}>
                {item.status}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="inbox" size={60} color="#ddd" />
      <Text style={styles.emptyText}>No {activeTab === 'scheduled' ? 'scheduled' : activeTab === 'active' ? 'active' : 'past'} orders</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <View style={styles.main}>
          <Header iconColor={appColors.white} titleStyle={{color:appColors.white}} title={"My Orders"} onBackPress={() => navigation.goBack()} />
  
     
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

      {/* underline indicator only for active tab */}
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
        />
      </View>
    </SafeAreaView>
  );
};


export default OrdersScreen;