import React, { useState, useCallback } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, ActivityIndicator, Keyboard
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import debounce from "lodash/debounce";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from './styles'
import appColors from "../../../theme/appColors";

const SearchLocationScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        // 🔹 Use OpenStreetMap Nominatim Search
       const res = await fetch(
  `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`,
  {
    headers: {
      "User-Agent": "MyReactNativeApp/1.0 (your_email@example.com)",
      "Accept": "application/json"
    }
  }
);

        const data = await res.json();
        const places = data.map((item, index) => ({
          id: item.place_id.toString(),
          name: item.display_name.split(",")[0],
          description: item.display_name,
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon),
          formattedAddress: item.display_name,
        }));
        setSuggestions(places);
      } catch (err) {
        console.error("OSM search error:", err);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

  const selectLocation = (location) => {
    Keyboard.dismiss();
    navigation.navigate("ConfirmLocation", { selectedLocation: location });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#363f64" />
        </TouchableOpacity>
        <Text style={styles.title}>Search Location</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={appColors.blue} />
        <TextInput
          style={styles.input}
          placeholder="Search for area, street..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={appColors.font}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Icon name="close-circle" size={20} color={appColors.blue} />
          </TouchableOpacity>
        )}
      </View>

      {loading && <ActivityIndicator style={{ margin: 10 }} color={appColors.blue} />}

      {/* Suggestions */}
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => selectLocation(item)}
          >
            <Icon name="location-outline" size={20} color={appColors.blue} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDesc} numberOfLines={1}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};



export default SearchLocationScreen;
