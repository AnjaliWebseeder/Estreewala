import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { washingWash, ironinWash } from "../../../utils/images/images";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from './styles';
import React, { useEffect, useCallback } from 'react';
import { clearVendors, getNearbyVendors } from "../../../redux/slices/nearByVendor";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import { getAddresses } from "../../../redux/slices/addressSlice";

const randomImages = [washingWash, ironinWash];

const PopularLaundry = (props) => {
  const dispatch = useDispatch();

  const { addresses } = useSelector(state => state.address);
  const { vendors } = useSelector(state => state.nearByVendor);
  const { vendorsError } = useSelector(
    state => state.nearByVendor
  );

  useEffect(() => {
    if (addresses?.length > 0) {
      dispatch(clearVendors());
      dispatch(getNearbyVendors());
    }
  }, [addresses, dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(clearVendors());
      dispatch(getNearbyVendors());
    }, [dispatch])
  );

  const popularVendors = vendors.slice(0, 3).map((vendor, index) => ({
    id: vendor.id,
    name: vendor.businessName,
    location: vendor.address,
    time: "9:00 AM - 11:00 PM",
    image: randomImages[index % randomImages.length],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Laundry</Text>

        {addresses?.length > 0 && (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('LaundryServiceList', {
                serviceName: "Popular Laundry",
              })
            }
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={popularVendors}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('LaundryService', {
                title: item.name,
                vendorId: item.id,
                address: item.location,
              })
            }
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
                  {item.location?.split(',')[0]}
                </Text>
              </View>

              <View style={styles.timeContainer}>
                <Ionicons name="time-outline" size={14} color="#07172cff" />
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          addresses?.length > 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No popular laundries available
              </Text>
            </View>
          ) : null
        }
      />
      {vendorsError && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{vendorsError}</Text>
        </View>
      )}
    </View>
  );
};

export default PopularLaundry;
