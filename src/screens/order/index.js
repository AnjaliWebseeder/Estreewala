import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";
import FastImage from "react-native-fast-image";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // ⭐ Star
import FontAwesome from "react-native-vector-icons/FontAwesome";   // ₹ Rupee
import { service1 , service2,service3,service4 } from "../../utils/images/images";
import Header from "../../components/header";
import appColors from "../../theme/appColors";

const orders = [
  {
    id: "1",
    title: "QuickClean Laundry",
    orderId: "AD323453",
    date: "20 Jun, 10:20 AM",
    items: "2 items",
    price: "13.00",
    status: "NEW",
    statusColor: "#e9fed5",
    textColor: "#34C759",
    image:service1,
  },
  {
    id: "2",
    title: "Sparkle Wash",
    orderId: "AD325854",
    date: "20 Jun, 09:02 AM",
    items: "3 items",
    price: "28.00",
    status: "WASHING",
    statusColor: "#ffe9c5",
    textColor: "#FF9500",
    image: service2,
  },
  {
    id: "3",
    title: "QuickClean Laundry",
    orderId: "AD32453",
    date: "18 Jun, 10:20 AM",
    items: "5 items",
    price: "17.00",
    status: "COMPLETED",
    statusColor: "#f2f6f9",
    textColor: "#a0a1a5",
    image: service3,
  },
  {
    id: "4",
    title: "FreshFold Express",
    orderId: "AD365247",
    date: "20 Jun, 08:36 AM",
    items: "4 items",
    price: "8.00",
    status: "5.0",
    statusColor: "#76bd1f",
    textColor: appColors.white,
    image: service4,
  },
  {
    id: "5",
    title: "UrbanWash Hub",
    orderId: "AD325843",
    date: "20 Jun, 09:02 AM",
    items: "3 items",
    price: "28.00",
    status: "5.0",
    statusColor: "#76bd1f",
    textColor:appColors.white,
    image: service1,
  },
];

const OrdersScreen = ({navigation}) => {
  const renderItem = ({ item }) => {
    const isRating = !isNaN(item.status); // check if status is numeric (rating)

    return (
      <View style={styles.card}>
       <View style={{flexDirection:"row", paddingHorizontal: 16}}>
         <FastImage source={item.image} style={styles.image} />
        <View style={styles.details}>
          {/* Title & Date Row */}
           <Text style={styles.title}>{item.title}</Text>
          <View style={styles.row}>
               {/* Order ID */}
          <Text style={styles.subText}>Order ID {item.orderId}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>
       </View>
    <View style={styles.border}/>
    <View style={[styles.row,{ paddingHorizontal: 16}]}>

  
        <View style={styles.row}>
            <Text style={styles.subText}>{item.items}</Text>
            <View style={styles.dot}/>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="rupee" size={14} color="#333" />
              <Text style={[styles.subText, { marginLeft: 4 }]}>{item.price}</Text>
            </View>
          </View> 

        
        <View
            style={[styles.statusBadge, { backgroundColor: item.statusColor }]}
          >
            {isRating ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="star" size={14} color={appColors.white} style={{marginBottom:2}} />
                <Text
                  style={[styles.statusText, { color: item.textColor, marginLeft: 4 }]}
                >
                  {item.status}
                </Text>
              </View>
            ) : (
              <Text style={[styles.statusText, { color: item.textColor }]}>
                {item.status}
              </Text>
            )}
          </View>
            </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
     <Header title={"Orders"} onBackPress={() => navigation.goBack()}/>
      <View style={styles.separator}/>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OrdersScreen;
