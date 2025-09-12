import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { washingWash } from "../../../utils/images/images";
import { ironinWash } from "../../../utils/images/images";
import Ionicons from "react-native-vector-icons/Ionicons";  // ✅ updated import
import {styles} from './styles'
const laundries = [
  {
    id: "1",
    name: "Wow dry wash",
    location: "Los Angels, United State",
    time: "10:00 AM - 11:00 PM",
    image: washingWash,
    rating: 4.8,
    reviews: 124
  },
  {
    id: "2",
    name: "Xoxo Washing House",
    location: "Los Angels, United State",
    time: "09:00 AM - 10:00 PM",
    image: ironinWash,
    rating: 4.5,
    reviews: 98
  },
  {
    id: "3",
    name: "Sparkle Cleaners",
    location: "Los Angels, United State",
    time: "08:00 AM - 09:00 PM",
    image: washingWash,
    rating: 4.9,
    reviews: 156
  },
];

const PopularLaundry = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Laundry</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('LaundryServiceList',{serviceName:"Popular Laundry"})} style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={laundries}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => props.navigation.navigate('LaundryScreen',{title: item.name})} activeOpacity={0.9} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
             
            </View>
            
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.location}>{item.location}</Text>
              </View>
              
              <View style={styles.timeContainer}>
                <Ionicons name="time-outline" size={14} color="#666" />
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};



export default PopularLaundry;
