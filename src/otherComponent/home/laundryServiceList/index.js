import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import FilterModal from '../filterModal';
import Header from '../../../components/header';
import SearchBar from '../../../components/searchBar';
import { styles } from './styles';
import appColors from '../../../theme/appColors';
import { service, service1, service2, service3, service4 } from '../../../utils/images/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { getNearbyVendors, updateNearbyVendors } from '../../../redux/slices/nearByVendor';
import { searchVendors, clearSearchResults } from '../../../redux/slices/searchSlice';
import { useSocket } from '../../../utils/context/socketContext';
import { useToast } from '../../../utils/context/toastContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../services/axiosConfig';
import { GET_NEARBY_VENDORS_FILTER_API } from '../../../services/api';


const randomImages = [service, service1, service2, service3, service4];

const LaundryCard = ({ vendor, navigation, index }) => {
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
          defaultSource={randomImage}
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

        {vendor.distanceKm && (
          <View style={styles.deliveryInfo}>
            <Icon name="location-on" size={12} color={appColors.darkBlue} />
            <Text style={styles.deliveryText}>
              {vendor.distanceKm.toFixed(1)} km away
            </Text>
          </View>
        )}

        <View style={styles.deliveryInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="access-time" size={12} color={appColors.darkBlue} />
            <Text style={styles.deliveryText}>
              {'9AM - 11 PM'}{' '}
            </Text>
          </View>
        </View>

        <View style={styles.dashedLine} />
      </View>
    </TouchableOpacity>
  );
};

// Main Component
const LaundryServiceList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { socket, isConnected } = useSocket();
  const { showToast } = useToast();
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [useFilteredList, setUseFilteredList] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState('');

  const { vendors, vendorsLoading, vendorsError } = useSelector(
    state => state.nearByVendor,
  );
  console.log("vendors", vendors);

  const { searchResults, searchLoading, searchError } = useSelector(
    state => state.search,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [localSearchResults, setLocalSearchResults] = useState([]);
  const [showSearchLoader, setShowSearchLoader] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const { serviceName } = route.params || {};

  useEffect(() => {
    if (!socket) {
      console.log('❌ No socket available for vendors updates');
      return;
    }

    console.log('🎯 Setting up nearby-vendors-update listener...');

    const handleNearbyVendorsUpdate = (data) => {
      console.log('📍 Real-time vendors update received:', data);
      console.log('📊 Vendors count:', data.vendors?.length);
      console.log('📍 Location:', data.location);

      if (!data.vendors || !Array.isArray(data.vendors)) {
        console.error('❌ Invalid vendors data received');
        return;
      }

      dispatch(updateNearbyVendors({
        vendors: data.vendors,
        location: data.location,
        timestamp: new Date().toISOString()
      }));

      setLastUpdateTime(new Date());
    };

    socket.on('nearby-vendors-update', handleNearbyVendorsUpdate);

    return () => {
      if (socket) {
        console.log('🧹 Cleaning up vendors listeners');
        socket.off('nearby-vendors-update', handleNearbyVendorsUpdate);
        socket.offAny();
      }
    };
  }, [socket, dispatch, showToast]);

  const performSearch = useCallback((query) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      dispatch(clearSearchResults());
      setLocalSearchResults([]);
      setShowSearchLoader(false);
      return;
    }

    if (trimmedQuery.length <= 2) {
      setShowSearchLoader(false);
      const localResults = vendors.filter(vendor =>
        vendor.businessName?.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
        vendor.address?.toLowerCase().includes(trimmedQuery.toLowerCase())
      );
      setLocalSearchResults(localResults);
      return;
    }

    setShowSearchLoader(true);
    dispatch(searchVendors(trimmedQuery));
  }, [dispatch, vendors]);

  // Debounced search with smart timing
  useEffect(() => {
    // Clear previous timeout
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, searchQuery.length <= 2 ? 300 : 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  useEffect(() => {
    if (!searchLoading && searchQuery.trim() !== '') {
      setShowSearchLoader(false);
      console.log("🔄 Search completed, loader hidden");
    }
  }, [searchLoading, searchQuery]);

  useEffect(() => {
    dispatch(getNearbyVendors());
  }, [dispatch]);

  const getDisplayVendors = () => {
    if (useFilteredList) return filteredVendors;
    if (searchQuery.trim() === '') return vendors;
    if (searchQuery.trim().length <= 2) return localSearchResults;
    return searchResults;
  };


  const displayVendors = getDisplayVendors();
  const isInitialLoading = vendorsLoading && vendors.length === 0;
  const isSearching = showSearchLoader && searchQuery.trim().length > 2;
  const hasSearchError = searchError && searchQuery.trim() !== '';
  const hasVendorsError = vendorsError && searchQuery.trim() === '';

  console.log("DISPLAY VENDORS", displayVendors)

  // Manual refresh function
  const handleManualRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    dispatch(getNearbyVendors());

    // Request real-time update from backend via socket
    if (socket && isConnected) {
      socket.emit('request-vendors-update', {
        timestamp: new Date().toISOString(),
        source: 'manual-refresh'
      });
    }
  };

  const applyFilters = async ({ rating, distance, services, reset }) => {

    if (reset) {
      setUseFilteredList(false);
      setFilteredVendors([]);
      setEmptyMessage('');
      setShowFilters(false);
      return;
    }

    try {
      console.log('🌐 BACKEND FILTER MODE (AXIOS)');

      const params = {};

      if (services?.length > 0) {
        params.services = services.join(',');
      }

      if (distance > 0) {
        params.maxDistance = distance;
      }

      console.log('➡️ FILTER PARAMS:', params);

      const response = await axiosInstance.get(
        GET_NEARBY_VENDORS_FILTER_API,
        {
          params,
          timeout: 10000,
        }
      );

      console.log('⬅️ API RESPONSE:', response.data);

      const apiVendors = response?.data?.vendors || [];

      if (apiVendors.length === 0) {
        setEmptyMessage(
          response?.data?.message ||
          'No vendors found for selected filters'
        );
      } else {
        setEmptyMessage('');
      }

      setFilteredVendors(
        rating > 0
          ? apiVendors.filter(v => v.rating >= rating)
          : apiVendors
      );

      setUseFilteredList(true);
      setShowFilters(false);

    } catch (error) {
      console.error(' FILTER API ERROR:', error);

      setEmptyMessage('Failed to apply filters');

      showToast?.({
        type: 'error',
        message: 'Failed to apply filters',
      });
    }
  };


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
    setUseFilteredList(false); // Go back to nearby vendors
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
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <ScrollView>
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
                      onPress={() => navigation.navigate('ManageAddress', {
                        redirectToLaundry: true
                      })}
                    >
                      <Icon name="add-location" size={20} color={appColors.white} />
                      <Text style={styles.primaryButtonText}>Add Delivery Address</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.secondaryButton}
                      onPress={handleManualRefresh}
                    >
                      <Text style={styles.secondaryButtonText}>Try Again</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.primaryButton}
                      onPress={handleManualRefresh}
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
            </View>
          </View>
        </ScrollView>
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
            inputStyle={{ color: appColors.black, fontSize: 12, }}
            placeholderTextColor={appColors.black}
            onClear={handleClearSearch}
          />


        </View>

        <View style={styles.main} />

        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={vendorsLoading}
              onRefresh={handleManualRefresh}
              colors={[appColors.blue]}
            />
          }
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
                {emptyMessage
                  ? emptyMessage
                  : searchQuery.trim() !== ''
                    ? searchQuery.length <= 2
                      ? 'Type more to search...'
                      : `No results for "${searchQuery}"`
                    : 'No vendors available in your area'}
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
                  <Text style={[styles.suggestSearchText, { color: "white" }]}>Try "dry wash"</Text>
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