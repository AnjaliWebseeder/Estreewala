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
import { service5,service6,service7,service8,service9,service10} from "../../../utils/images/images";

const PRODUCT_DATA = {
  men: [
    { id: "1", name: "Formal Shirt", price: 5, image:service6},
    { id: "2", name: "Casual Shirt", price: 8, image: service5},
  ],
  women: [
    { id: "3", name: "Dress", price: 15, image: service7 },
    { id: "4", name: "Blouse", price: 12, image: service8 },
  ],
  kids: [
    { id: "5", name: "Tshirt", price: 10, image: service9 },
    { id: "6", name: "Joggers", price: 10, image: service10 },
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
        <Text style={styles.meta}>⭐ 4.0</Text>
        <Text style={styles.meta}>🚴 Delivery · 1 Hour</Text>
      </View>
          <View style={{ paddingHorizontal: 18, marginBottom: 8,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
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
              {totalItems} Item{totalItems > 1 ? "s" : ""} • ₹{totalPrice.toFixed(2)}
            </Text>
            <Text style={styles.cartSub}>Extra charges may apply</Text>
          </View>

          <TouchableOpacity style={styles.cartBtn} activeOpacity={0.85}>
            <Text style={styles.cartBtnText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}

  
    </SafeAreaView>
  );
}

