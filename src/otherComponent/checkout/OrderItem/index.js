import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import appColors from '../../../theme/appColors';
import { getItemImage } from "../../../utils/data/imageMapping"; 

// Update OrderItem.js to pass the correct item.id
const OrderItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const itemImage = getItemImage(item.name, item.category);
  
  return (
    <View style={styles.itemCard}>
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
          onPress={() => onUpdateQuantity(-1)} // ✅ Remove item.id parameter
        >
          <Icon name="remove" size={15} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => onUpdateQuantity(1)} // ✅ Remove item.id parameter
        >
          <Icon name="add" size={15} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.removeItemButton}
        onPress={onRemoveItem} // ✅ No need to pass item.id
      >
        <Icon style={{marginLeft:2}} name="close" size={16} color="#ff6b6b" />
      </TouchableOpacity>
    </View>
  );
};

export default OrderItem;