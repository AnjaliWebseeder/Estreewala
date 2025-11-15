import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { washingWash, ironinWash } from "../../../utils/images/images";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from './styles'
import React, { useEffect } from 'react';
import { getNearbyVendors } from "../../../redux/slices/nearByVendor";
import { useDispatch, useSelector } from "react-redux";

// Array of random images to use for vendors
const randomImages = [washingWash, ironinWash];

const PopularLaundry = (props) => {
  const dispatch = useDispatch();
  
  // Fetch vendors on component mount
  useEffect(() => {
    dispatch(getNearbyVendors());
  }, [dispatch]);

  const { vendors } = useSelector(state => state.nearByVendor);
  // Get first 3 vendors and assign random images
  const popularVendors = vendors.slice(0, 3).map((vendor, index) => ({
    id: vendor.id,
    name: vendor.businessName,
    location: vendor.address,
    time: "9:00 AM - 11:00 PM", // Default time
    image: randomImages[index % randomImages.length], // Cycle through available images
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Laundry</Text>
        <TouchableOpacity 
          onPress={() => props.navigation.navigate('LaundryServiceList', { serviceName: "Popular Laundry" })} 
          style={styles.viewAllButton}
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={popularVendors}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => props.navigation.navigate('LaundryService', { 
              title: item.name,
              vendorId: item.id,
              address: item.location
            })} 
            activeOpacity={0.9} 
            style={styles.card}
          >
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
            </View>
            
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={14} color="#07172cff" />
                <Text style={styles.location} numberOfLines={1}>
                  {item.location.split(',')[0]} {/* Show only first part of address */}
                </Text>
              </View>
              
              <View style={styles.timeContainer}>
                <Ionicons name="time-outline" size={14} color="#07172cff"/>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No popular laundries available</Text>
          </View>
        }
      />
    </View>
  );
};

export default PopularLaundry;