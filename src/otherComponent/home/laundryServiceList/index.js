import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import FilterModal from '../filterModal';
import Header from '../../../components/header';
import SearchBar from '../../../components/searchBar';
import {styles} from './styles'
import appColors from '../../../theme/appColors';
import { service , service1, service2, service3, service4 } from '../../../utils/images/images';

// Laundry Card Component
const LaundryCard = ({ laundry , navigation }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={() => navigation.navigate('LaundryService',{title: laundry.name})} 
      style={styles.card}
    >
      <View style={styles.imageWrapper}>
        <FastImage
          source={laundry.image}
          style={styles.cardImage}
          resizeMode="cover"
        /> 
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{laundry.name}</Text>
        <View style={styles.deliveryInfo}>
          <Icon style={styles.locationIcon} name="location-on" size={16} color={"#878787ff"} />
          <Text style={styles.cardLocation}>{laundry.location}</Text>
        </View>
        
        {/* Delivery Info */}
        <View style={styles.deliveryInfo}>
          <Icon name="access-time" size={14} color={appColors.font} />
          <Text style={styles.deliveryText}>
            {laundry.time}{" "}
            <Text style={styles.dash}> | </Text>{" "}
            {laundry.distance}
          </Text>
        </View>

        {/* Dashed line below delivery info */}
        <View style={styles.dashedLine} />

        {/* Rating Section */}
        <View style={styles.ratingRow}>
          <View style={styles.ratingBadge}>
            <Icon style={styles.iconStyle} name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingBadgeText}>
              {laundry.rating.toFixed(1)}
            </Text>
          </View>
          <Text style={styles.ratingsCount}>{laundry.ratingsCount} Rated</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Main Component
const LaundryServiceList = ({ navigation , route  }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredLaundries, setFilteredLaundries] = useState([]);
    const {serviceName} = route.params || {};

  // Sample data
  const laundryData = [
    { id: 1, name: "QuickClean Laundry", location: "No 6,Akok road,yaba", time: "9AM - 11 PM", distance: "1.5 km", rating: 4.0, ratingsCount: 256, image:service },
    { id: 2, name: "Sparkle Wash", location: "Jamsom", time: "9AM - 11 PM", distance: "1.5 km", rating: 5.0, ratingsCount: 112, image: service3 },
    { id: 3, name: "FreshFold Express", location: "No 6,Akok road,yaba", time: "9AM - 11 PM", distance: "1.5 km", rating: 5.0, ratingsCount: 225, image: service2 },
    { id: 4, name: "UrbanWash Hub", location: "No 6,Akok road,yaba", time: "9AM - 11 PM", distance: "1.5 km", rating: 5.0, ratingsCount: 256, image: service1 },
    { id: 5, name: "Mr. Neat Laundry Co.", location: "Jamsom", time: "9AM - 11 PM", distance: "2.2 km", rating: 4.5, ratingsCount: 189, image: service4 }
  ];

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setFilteredLaundries(laundryData);
    } else {
      const filtered = laundryData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLaundries(filtered);
    }
  };

  const applyFilters = (filters) => {
    let filtered = laundryData;
    if (filters.rating > 0) {
      filtered = filtered.filter(item => item.rating >= filters.rating);
    }
    if (filters.time) {
      const time = parseInt(filters.time);
      filtered = filtered.filter(item => {
        const itemTime = parseInt(item.time);
        return itemTime <= time;
      });
    }
    if (filters.distance) {
      const maxDistance = filters.distance.includes('Under') ? 1 :
        filters.distance.includes('1-3') ? 3 : 5;
      filtered = filtered.filter(item => {
        const itemDistance = parseFloat(item.distance);
        return itemDistance <= maxDistance;
      });
    }
    setFilteredLaundries(filtered);
  };

  return (
    <View style={styles.container}>
      <Header
        title={serviceName ? serviceName : "Dry Wash" } 
        onBackPress={() => navigation.goBack()}
        containerStyle={{ justifyContent: "flex-start"}}
        titleStyle={{marginHorizontal:20}}
      />
      
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search"
        onFilterPress={() => setShowFilters(true)}
        showFilter={true}
      />

      <Text style={styles.searchTitle}>Laundry near me</Text>
     <ScrollView 
  contentContainerStyle={styles.contentContainerStyle} 
  style={styles.listContainer} 
  showsVerticalScrollIndicator={false}
>
  {filteredLaundries.length > 0 ? (
    filteredLaundries.map((laundry) => (
      <LaundryCard key={laundry.id} laundry={laundry} navigation={navigation} />
    ))
  ) : (
    <View style={{ alignItems: 'center', marginTop: 40 }}>
      <Text style={styles.textStyle}>
        No laundries found
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
  );
};

export default LaundryServiceList;
