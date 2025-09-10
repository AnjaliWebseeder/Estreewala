import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import ProductItem from './productItem'
import CustomDropdown from "../../../components/dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import {styles} from './styles'
import { service5,service6,service7,service8,service9,service10,service11,service12,service13,service14,service15,service16,service17,service18,service19} from "../../../utils/images/images";
import fonts from "../../../theme/appFonts";
import Icon from 'react-native-vector-icons/MaterialIcons';
import appColors from "../../../theme/appColors";
import { useNavigation } from '@react-navigation/native';

const PRODUCT_DATA = {
  men: [
    { id: "1", name: "Formal Shirt", price: 5, image: service6 },
    { id: "2", name: "Casual Shirt", price: 8, image: service5 },
    { id: "3", name: "Jeans", price: 12, image: service11 },
    { id: "4", name: "Trousers", price: 10, image: service12 },
    { id: "5", name: "Suit", price: 25, image: service13 },
    { id: "6", name: "Jacket", price: 18, image: service14 },
  ],
  women: [
    { id: "7", name: "Dress", price: 15, image: service7 },
    { id: "8", name: "Blouse", price: 12, image: service8 },
    { id: "9", name: "Saree", price: 20, image: service15 },
    { id: "10", name: "Skirt", price: 10, image: service16 },
    { id: "11", name: "Kurti", price: 14, image: service17 },
    { id: "12", name: "Jacket", price: 16, image: service18 },
  ],
  kids: [
    { id: "13", name: "Tshirt", price: 10, image: service9 },
    { id: "14", name: "Joggers", price: 10, image: service10 },
    { id: "15", name: "School Uniform", price: 12, image: service19 },
  ],
};


const SERVICES = [
  { label: "Wash & Iron", value: "wash_iron" },
  { label: "Dry Clean", value: "dry_clean" },
  { label: "Iron Only", value: "iron_only" },
];

export default function LaundryScreen({navigation}) {
  const [cart, setCart] = useState({});
  const [category, setCategory] = useState("men");

const PRODUCTS = PRODUCT_DATA[category];
  const [selectedService, setSelectedService] = useState(() =>
    PRODUCTS.reduce((acc, p) => {
      acc[p.id] = SERVICES[0].value;
      return acc;
    }, {})
  );

  const CATEGORIES = [
  { label: "Men's Wear", value: "men" },
  { label: "Women's Wear", value: "women" },
  { label: "Kids Wear", value: "kids" },
];

  function handleAdd(p) {
    setCart((s) => ({
      ...s,
      [p.id]: { qty: 1, service: selectedService[p.id] || SERVICES[0].value },
    }));
  }

  function handleIncrement(id) {
    setCart((s) => ({ ...s, [id]: { ...s[id], qty: s[id].qty + 1 } }));
  }

  function handleDecrement(id) {
    setCart((s) => {
      const cur = s[id];
      if (!cur) return s;
      if (cur.qty <= 1) {
        const copy = { ...s };
        delete copy[id];
        return copy;
      }
      return { ...s, [id]: { ...cur, qty: cur.qty - 1 } };
    });
  }

  function handleChangeService(id, service) {
    setSelectedService((s) => ({ ...s, [id]: service }));
    setCart((s) => {
      if (!s[id]) return s;
      return { ...s, [id]: { ...s[id], service } };
    });
  }

  const cartItems = Object.keys(cart).map((k) => ({ id: k, ...cart[k] }));
  const totalItems = cartItems.reduce((sum, it) => sum + it.qty, 0);
  const totalPrice = cartItems.reduce((sum, it) => {
    const prod = PRODUCTS.find((p) => p.id === it.id);
    return sum + (prod ? prod.price * it.qty : 0);
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header containerStyle={{ paddingVertical: 10}}  onBackPress={() => navigation.goBack() } />
      <View style={styles.header}>
        <Text style={styles.title}>QuickClean Laundry</Text>
        <Text style={styles.sub}>Central Park | 1.5 km</Text>
      </View>
     <View style={styles.dashedLine}/>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>⭐ {" "}4.0</Text>
       <Text style={styles.meta}>🕒 {" "}9 AM - 11 PM</Text>
      </View>
          <View style={{ paddingHorizontal: 18, marginBottom:0,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Text style={styles.categoryTitle}>Choose Service</Text>
  <CustomDropdown
    options={CATEGORIES}
    value={category}
    onChange={setCategory}
    placeholder="Select Category"
  />
</View>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            qty={cart[item.id]?.qty || 0}
            service={selectedService[item.id] || SERVICES[0].value}
            services={SERVICES}
            onAdd={handleAdd}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onChangeService={handleChangeService}
          />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {totalItems > 0 && (
        <View style={styles.cartBar}>
          <View>
            <Text style={styles.cartTitle}>
              {totalItems} Item{totalItems > 1 ? "s" : ""} • <Text style={{fontFamily:fonts.PoppinsRegular}}>
                <Icon name="currency-rupee" size={13} color={appColors.white} />
                </Text>{totalPrice.toFixed(2)}
            </Text>
            <Text style={styles.cartSub}>Extra charges may apply</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('LaundryCheckoutScreen') } style={styles.cartBtn} activeOpacity={0.85}>
            <Text style={styles.cartBtnText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}

  
    </SafeAreaView>
  );
}

