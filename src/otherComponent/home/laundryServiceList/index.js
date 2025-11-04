import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import FilterModal from '../filterModal';
import Header from '../../../components/header';
import SearchBar from '../../../components/searchBar';
import {styles} from './styles'
import appColors from '../../../theme/appColors';
import { service  } from '../../../utils/images/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons"; 
import { useDispatch, useSelector } from 'react-redux';
import { getNearbyVendors } from "../../../redux/slices/nearByVendor"

// Default placeholder image - add this to your images
const defaultVendorImage = service; // or any default image you prefer

// Laundry Card Component
const LaundryCard = ({ vendor, navigation }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={() => navigation.navigate('LaundryService', { 
        title: vendor.businessName,
        vendorId: vendor.id 
      })} 
      style={styles.card}
    >
      <View style={styles.imageWrapper}>
        <FastImage
          source={vendor.profileImage ? { uri: vendor.profileImage } : defaultVendorImage}
          style={styles.cardImage}
          resizeMode="cover"
          defaultSource={defaultVendorImage} // Fallback image
        /> 
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{vendor.businessName}</Text>
        <View style={styles.deliveryInfo}>
          <Ionicons name="location-outline" size={14} color="#07172cff" />
          <Text style={styles.cardLocation} numberOfLines={2}>
            {vendor.address}
          </Text>
        </View>
        
        {/* Delivery Info - You can customize this based on your vendor data */}
        <View style={styles.deliveryInfo}>
          <View style={{flexDirection:"row", alignItems: 'center'}}>
            <Icon name="access-time" size={12} color={appColors.darkBlue} />
            <Text style={styles.deliveryText}>
              {"9AM - 11 PM"}{" "}
              {/* <Text style={styles.dash}> | </Text>{" "}
              {"1.5 km"}  */}
            </Text>
            {/* <View style={styles.ratingRow}>
              <View style={styles.ratingBadge}>
                <Icon style={styles.iconStyle} name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingBadgeText}>
                  {"4.5"}
                </Text>
              </View>
            </View> */}
          </View>
        </View>

        {/* Dashed line below delivery info */}
        <View style={styles.dashedLine} />
      </View>
    </TouchableOpacity>
  );
};

// Main Component
const LaundryServiceList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { vendors, vendorsLoading, vendorsError } = useSelector(state => state.nearByVendor);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const { serviceName } = route.params || {};

  // Fetch vendors on component mount
  useEffect(() => {
    dispatch(getNearbyVendors());
  }, [dispatch]);

  // Filter vendors based on search query
  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, vendors]);

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setFilteredVendors(vendors);
    } else {
      const filtered = vendors.filter(vendor =>
        vendor.businessName?.toLowerCase().includes(query.toLowerCase()) ||
        vendor.address?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVendors(filtered);
    }
  };

  const applyFilters = (filters) => {
    let filtered = vendors;
    // Apply your filter logic here based on vendor data
    // For example, if you have rating/distance in vendor data
    if (filters.rating > 0) {
      // filtered = filtered.filter(vendor => vendor.rating >= filters.rating);
    }
    if (filters.distance) {
      // filtered = filtered.filter(vendor => vendor.distance <= filters.distance);
    }
    setFilteredVendors(filtered);
  };

  if (vendorsLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={{backgroundColor:"#07172cff",paddingBottom:20}}>
            <Header
              containerStyle={{marginBottom:5}}
              iconColor={appColors.white}
              title={serviceName ? serviceName : "Nearby Laundry"} 
              onBackPress={() => navigation.goBack()}
              titleStyle={{marginHorizontal: 20,color:appColors.white}}
            />
          </View>
          <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
           <ActivityIndicator color={appColors.darkBlue} size={"small"}/>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (vendorsError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={{backgroundColor:"#07172cff",paddingBottom:20}}>
            <Header
              containerStyle={{marginBottom:5}}
              iconColor={appColors.white}
              title={serviceName ? serviceName : "Nearby Laundry"} 
              onBackPress={() => navigation.goBack()}
              titleStyle={{marginHorizontal: 20,color:appColors.white}}
            />
          </View>
          <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={[styles.textStyle, {color: 'red'}]}>Error: {vendorsError}</Text>
            <TouchableOpacity 
              style={{marginTop: 10, padding: 10, backgroundColor: appColors.darkBlue, borderRadius: 5}}
              onPress={() => dispatch(getNearbyVendors())}
            >
              <Text style={{color: appColors.white}}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{backgroundColor:"#07172cff",paddingBottom:20}}>
          <Header
            containerStyle={{marginBottom:5}}
            iconColor={appColors.white}
            title={serviceName ? serviceName : "Nearby Laundry"} 
            onBackPress={() => navigation.goBack()}
            titleStyle={{marginHorizontal: 20,color:appColors.white}}
          />
          
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search"
            onFilterPress={() => setShowFilters(true)}
            showFilter={true}
            searchInputContainerStyle={{backgroundColor:appColors.white, borderWidth: 0}}
            inputStyle={{color:appColors.black}}
            placeholderTextColor={appColors.black}
          />
        </View>

        <View style={styles.main}/>
        <ScrollView 
          contentContainerStyle={styles.contentContainerStyle} 
          style={styles.listContainer} 
          showsVerticalScrollIndicator={false}
        >
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor) => (
              <LaundryCard key={vendor.id} vendor={vendor} navigation={navigation} />
            ))
          ) : (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Text style={styles.textStyle}>
                {vendors.length === 0 ? "No vendors available" : "No vendors found"}
              </Text>
            </View>
          )}
        </ScrollView>

        <FilterModal
          visible={showFilters}
          onClose={() => setShowFilters(false)}
          onApplyFilters={applyFilters}
        />
      </View>
    </SafeAreaView>
  );
};

export default LaundryServiceList;