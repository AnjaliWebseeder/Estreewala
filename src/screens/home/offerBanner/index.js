import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { offer, offer1,offer2 ,deliveryman,delivery} from "../../../utils/images/images";
import {styles} from './styles'
import LinearGradient from 'react-native-linear-gradient';

const laundryOffers = [
  {
    id: "1",
    title: "50% OFF",
    subText: "On Your First Laundry Order",
    image: deliveryman // laundry basket
  },
  {
    id: "2",
    title: "Free Pickup & Delivery",
    subText: "On Orders Above ₹499",
    image: delivery
  },
  {
    id: "3",
    title: "Free Pickup & Delivery",
    subText: "On Orders Above ₹499",
    image: offer2
  },

];

const BannerOffer = () => {
  const [activeIndex, setActiveIndex] = useState(0);

const renderItem = ({ item, index }) => (
 <LinearGradient
  colors={['rgba(9, 191, 230, 0.2)', '#FFF9CC']} 
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={[styles.card, index === activeIndex && styles.activeCard]}
>
    <View style={styles.contentContainer}>
      <Image source={item.image} style={styles.offerImage} />
      <View style={styles.textContainer}>
        <Text style={styles.offerTitle}>{item.title}</Text>
        <Text style={styles.offerSub}>{item.subText}</Text>
      </View>
    </View>
</LinearGradient>
);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Latest Laundry Offers</Text>
      <FlashList
        contentContainerStyle={styles.contentContainerStyle}
        data={laundryOffers}
        horizontal
        keyExtractor={(item) => item.id}
        estimatedItemSize={200}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
          }
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
      />
      
      {/* Active dots indicator */}
      <View style={styles.dotsContainer}>
        {laundryOffers.map((_, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => {
              // Scroll to the specific index
            }}
          >
            <View 
              style={[
                styles.dot, 
                index === activeIndex ? styles.activeDot : styles.inactiveDot
              ]} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};



export default BannerOffer;