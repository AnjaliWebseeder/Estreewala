import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import FilterModal from '../filterModal';
import Header from '../../../components/header';
import SearchBar from '../../../components/searchBar';
import { styles } from './styles';
import appColors from '../../../theme/appColors';
import { service , service1 , service2 , service3 ,service4 } from '../../../utils/images/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { getNearbyVendors } from '../../../redux/slices/nearByVendor';
import { searchVendors, clearSearchResults } from '../../../redux/slices/searchSlice';

// Default placeholder image - add this to your images
const defaultVendorImage = service; // or any default image you prefer
const randomImages = [service, service1, service2, service3, service4];

// Laundry Card Component
const LaundryCard = ({ vendor, navigation , index}) => {
    const randomImage = randomImages[index % randomImages.length];
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('LaundryService', {
          title: vendor.businessName,
          vendorId: vendor.id,
          address: vendor.address
        })
      }
      style={styles.card}
    >
      <View style={styles.imageWrapper}>
        <FastImage
          source={
            vendor.profileImage
              ? { uri: vendor.profileImage }
              : randomImage
          }
          style={styles.cardImage}
          resizeMode="cover"
          defaultSource={randomImage} // fallback image
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{vendor.businessName}</Text>
        <View style={styles.deliveryInfo}>
          <Ionicons style={styles.icon} name="location-outline" size={14} color="#07172cff" />
          <Text style={styles.cardLocation} numberOfLines={2}>
            {vendor.address}
          </Text>
        </View>

        {/* Delivery Info - You can customize this based on your vendor data */}
        <View style={styles.deliveryInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="access-time" size={12} color={appColors.darkBlue} />
            <Text style={styles.deliveryText}>
              {'9AM - 11 PM'}{' '}
            </Text>
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
  
  // Get data from both nearby vendors and search
  const { vendors, vendorsLoading, vendorsError } = useSelector(
    state => state.nearByVendor,
  );
  
  const { searchResults, searchLoading, searchError } = useSelector(
    state => state.search,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [localSearchResults, setLocalSearchResults] = useState([]);
  const [showSearchLoader, setShowSearchLoader] = useState(false);
  const { serviceName } = route.params || {};

  // Smart search function with multiple strategies
  const performSearch = useCallback((query) => {
    const trimmedQuery = query.trim();
    
    if (trimmedQuery === '') {
      dispatch(clearSearchResults());
      setLocalSearchResults([]);
      setShowSearchLoader(false);
      return;
    }

    // Strategy 1: Local search for very short queries (1-2 characters)
    if (trimmedQuery.length <= 2) {
      setShowSearchLoader(false);
      const localResults = vendors.filter(vendor =>
        vendor.businessName?.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
        vendor.address?.toLowerCase().includes(trimmedQuery.toLowerCase())
      );
      setLocalSearchResults(localResults);
      return;
    }

    // Strategy 2: API search for meaningful queries (3+ characters)
    setShowSearchLoader(true);
    dispatch(searchVendors(trimmedQuery));
  }, [dispatch, vendors]);

  // Debounced search with smart timing
  useEffect(() => {
    // Clear previous timeout
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, searchQuery.length <= 2 ? 300 : 500); // Shorter delay for short queries

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  // FIXED: Handle search results - clear loader when search completes (even with empty results)
  useEffect(() => {
    if (!searchLoading && searchQuery.trim() !== '') {
      setShowSearchLoader(false);
      console.log("🔄 Search completed, loader hidden");
    }
  }, [searchLoading, searchQuery]);

  // Fetch vendors on component mount
  useEffect(() => {
    dispatch(getNearbyVendors());
  }, [dispatch]);

  // Determine which vendors to display with priority
  const getDisplayVendors = () => {
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery === '') {
      return vendors;
    }
    
    // For short queries, show local results immediately
    if (trimmedQuery.length <= 2) {
      return localSearchResults;
    }
    
    // For longer queries, show API results
    return searchResults;
  };

  const displayVendors = getDisplayVendors();
  const isInitialLoading = vendorsLoading && vendors.length === 0;
  const isSearching = showSearchLoader && searchQuery.trim().length > 2;
  const hasSearchError = searchError && searchQuery.trim() !== '';
  const hasVendorsError = vendorsError && searchQuery.trim() === '';

  // Show skeleton loaders during search
  const showSkeletons = isSearching && displayVendors.length === 0;

  const applyFilters = filters => {
    let filtered = vendors;
    // Apply your filter logic here based on vendor data
    if (filters.rating > 0) {
      // filtered = filtered.filter(vendor => vendor.rating >= filters.rating);
    }
    if (filters.distance) {
      // filtered = filtered.filter(vendor => vendor.distance <= filters.distance);
    }
    // Note: Filters only apply to nearby vendors, not search results
  };

  // Handle search input change with immediate feedback
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    
    // Immediate local feedback for very short queries
    if (text.trim().length <= 2) {
      const immediateResults = vendors.filter(vendor =>
        vendor.businessName?.toLowerCase().includes(text.toLowerCase()) ||
        vendor.address?.toLowerCase().includes(text.toLowerCase())
      );
      setLocalSearchResults(immediateResults);
    }
  };

  // Clear search completely
  const handleClearSearch = () => {
    setSearchQuery('');
    setLocalSearchResults([]);
    dispatch(clearSearchResults());
    setShowSearchLoader(false);
  };

  if (isInitialLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={{ backgroundColor: '#07172cff', paddingBottom: 20 }}>
            <Header
              containerStyle={{ marginBottom: 5 }}
              iconColor={appColors.white}
              title={serviceName ? serviceName : 'Nearby Laundry'}
              onBackPress={() => navigation.goBack()}
              titleStyle={{ marginHorizontal: 20, color: appColors.white }}
            />
          </View>
          <View
            style={[
              styles.container,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            <ActivityIndicator color={appColors.darkBlue} size={'small'} />
            <Text style={{ marginTop: 10, color: appColors.darkBlue }}>
              Loading nearby vendors...
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (hasVendorsError && displayVendors.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={{ backgroundColor: '#07172cff', paddingBottom: 20 }}>
            <Header
              containerStyle={{ marginBottom: 5 }}
              iconColor={appColors.white}
              title={serviceName ? serviceName : 'Nearby Laundry'}
              onBackPress={() => navigation.goBack()}
              titleStyle={{ marginHorizontal: 20, color: appColors.white }}
            />
          </View>
          
          <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
            <View style={styles.errorIconContainer}>
              <Icon name="error-outline" size={60} color={appColors.orange} />
            </View>
            
            <Text style={styles.errorTitle}>
              {vendorsError?.includes('location') || vendorsError?.includes('address') 
                ? 'Location Required' 
                : 'Connection Error'}
            </Text>
            
            <Text style={styles.errorMessage}>
              {vendorsError?.includes('location') || vendorsError?.includes('address') 
                ? "We need your location to find nearby laundry services. Please add your delivery address to continue."
                : "Unable to load nearby vendors. Please check your connection and try again."}
            </Text>
            
            <View style={styles.errorActions}>
              {(vendorsError?.includes('location') || vendorsError?.includes('address')) ? (
                <>
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('Profile', { 
                      screen: 'ManageAddress',
                      params: { redirectToLaundry: true }
                    })}
                  >
                    <Icon name="add-location" size={20} color={appColors.white} />
                    <Text style={styles.primaryButtonText}>Add Delivery Address</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => dispatch(getNearbyVendors())}
                  >
                    <Text style={styles.secondaryButtonText}>Try Again</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => dispatch(getNearbyVendors())}
                  >
                    <Icon name="refresh" size={20} color={appColors.white} />
                    <Text style={styles.primaryButtonText}>Retry</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.secondaryButtonText}>Go Back</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            
            <Text style={styles.helpText}>
              💡 Go to Profile → Manage Address to add your delivery location
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{ backgroundColor: '#07172cff', paddingBottom: 20 }}>
          <Header
            containerStyle={{ marginBottom: 5 }}
            iconColor={appColors.white}
            title={serviceName ? serviceName : 'Nearby Laundry'}
            onBackPress={() => navigation.goBack()}
            titleStyle={{ marginHorizontal: 20, color: appColors.white }}
          />

          <SearchBar
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder="Search for services or vendors..."
            onFilterPress={() => setShowFilters(true)}
            showFilter={true}
            searchInputContainerStyle={{
              backgroundColor: appColors.white,
              borderWidth: 0,
            }}
            inputStyle={{ color: appColors.black }}
            placeholderTextColor={appColors.black}
            onClear={handleClearSearch}
          />
        </View>

        <View style={styles.main} />
      
    

        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
        >
          {displayVendors.length > 0 ? (
            // Show actual results
            displayVendors.map((vendor, index) => (
              <LaundryCard
                key={vendor.id || `${vendor.businessName}-${index}`}
                vendor={vendor}
                navigation={navigation}
                index={index}
              />
            ))
          ) : (
            // Show empty state
            <View style={styles.emptyState}>
              <Icon name="search-off" size={60} color={appColors.lightGray} />
              <Text style={styles.emptyStateTitle}>
                {searchQuery.trim() !== '' 
                  ? searchQuery.length <= 2
                    ? 'Type more to search...'
                    : `No results for "${searchQuery}"`
                  : 'No vendors available in your area'
                }
              </Text>
              <Text style={styles.emptyStateSubtitle}>
                {searchQuery.trim() !== '' && searchQuery.length > 2
                  ? 'Try searching for: dry wash, laundry, ironing, etc.'
                  : 'Check back later or try a different location'
                }
              </Text>
              
              {searchQuery.trim() !== '' && searchQuery.length > 2 && (
                <TouchableOpacity 
                  style={styles.suggestSearchButton}
                  onPress={() => setSearchQuery('dry wash')}
                >
                  <Text style={[styles.suggestSearchText,{color:"white"}]}>Try "dry wash"</Text>
                </TouchableOpacity>
              )}
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