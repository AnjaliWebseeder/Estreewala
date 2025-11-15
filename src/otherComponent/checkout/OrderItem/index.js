import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import appColors from '../../../theme/appColors';
import { getItemImage } from "../../../utils/data/imageMapping"; 

const OrderItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  // Use your getItemImage function to get the correct image
  const itemImage = getItemImage(item.name, item.category);
  
  console.log("🖼️ Image for item:", {
    name: item.name,
    category: item.category,
    image: itemImage
  });

  return (
    <View style={styles.itemCard}>
      {/* Use the dynamic image from your mapping */}
      <FastImage 
        source={itemImage} 
        style={styles.itemImage} 
        resizeMode={FastImage.resizeMode.contain}
      />
      
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
         
        <View style={styles.serviceTag}>
          <Text style={styles.serviceTagText}>
            {item.category} — {item.service}
          </Text>
        </View>
        
        <Text style={styles.itemPrice}>
          <Icon name="currency-rupee" size={12} color={appColors.blue} />
          {item.price.toFixed(2)} each
        </Text>
      </View>
   
      <View style={styles.quantityContainer}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => onUpdateQuantity(item.id, -1)}
        >
          <Icon name="remove" size={15} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => onUpdateQuantity(item.id, 1)}
        >
          <Icon name="add" size={15} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.removeItemButton}
        onPress={() => onRemoveItem(item.id)}
      >
        <Icon style={{marginLeft:2}} name="close" size={16} color="#ff6b6b" />
      </TouchableOpacity>
    </View>
  );
};

export default OrderItem;