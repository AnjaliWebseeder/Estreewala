import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomDropdown from '../../../../components/dropdown'
import {styles} from './styles'
import FastImage from "react-native-fast-image";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProductItem({
  product,
  qty = 0,
  service,
  onAdd,
  onIncrement,
  onDecrement,
  onChangeService,
  services,
}) {
  const inCart = qty > 0;

  return (
    <View style={styles.wrap}>
      <FastImage source={ product.image } style={styles.img} />

      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>  <Icon name="currency-rupee" size={12} color={"#7B7F86"} />{product.price.toFixed(2)}</Text>

        <View style={{ marginTop: 8 }}>
          <CustomDropdown
            options={services}
            value={service}
            onChange={(v) => onChangeService(product.id, v)}
          />
        </View>
      </View>

      <View style={styles.right}>
        {!inCart ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAdd(product)}
            activeOpacity={0.8}
          >
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => onDecrement(product.id)}>
              <Ionicons name="remove" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity onPress={() => onIncrement(product.id)}>
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}


