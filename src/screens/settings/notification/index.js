import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../../components/header";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { SafeAreaView } from "react-native-safe-area-context";

const notifications = [
  {
    id: "1",
    icon: "checkmark-circle",
    bgColor: "#4CAF50",
    title: "Successfully booked. You will rece...",
    time: "Yesterday at 10:00 AM",
  },
  {
    id: "2",
    icon: "pricetag",
    bgColor: "#1E88E5",
    title: "Lockdown: Enjoy upto 70% off...",
    time: "12 Mar 2021 at 10:00 PM",
  },
  {
    id: "3",
    icon: "car",
    bgColor: "#FB8C00",
    title: "Order is on the way.",
    time: "09 Mar 2021 at 11:35 AM",
  },
  {
    id: "4",
    icon: "cube",
    bgColor: "#8E24AA",
    title: "Order is being prepared.",
    time: "20 Feb 2021 at 10:00 AM",
  },
  {
    id: "5",
    icon: "pricetag",
    bgColor: "#03A9F4",
    title: "Grab now New Year 2021 discount.",
    time: "31 Dec 2020 at 11:00 PM",
  },
];

const Notification = ({navigation}) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={[styles.iconWrapper, { backgroundColor: item.bgColor }]}>
        <Icon name={item.icon} size={20} color={appColors.white} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
  <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <Header
        title="Notification"
        onBackPress={() => navigation.goBack()}
        onRightPress={() => console.log("Settings pressed")}
       
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:appColors.background,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: appColors.menuCard,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily:fonts.InterMedium,
    color:appColors.font,
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    fontFamily:fonts.InterRegular,
    color:appColors.subTitle,
  },
});

export default Notification;
