import { useEffect, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import appColors from '../../../theme/appColors';
import Header from '../../../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderConfirmation = ({ navigation, route }) => {
  const { orderData } = route.params || {};
  const summary = orderData?.summary || {};

  console.log('find order data in OrderConfirmation ===>>>', orderData);

  const orderDetails = useMemo(() => {
    if (!orderData) return null;

    const pickupDateTime = summary.pickup?.split(', ') || [];
    const deliveryDateTime = summary.delivery?.split(', ') || [];

    return {
      orderId: orderData?.orderId || '-',
      orderDate: new Date().toLocaleDateString(), // current date
      pickupDate: pickupDateTime[0] || 'N/A',
      pickupTime: pickupDateTime[1] || 'N/A',
      deliveryDate: deliveryDateTime[0] || 'N/A',
      deliveryTime: deliveryDateTime[1] || 'N/A',
      address: summary?.address?.fullAddress || 'N/A',
      items:
        summary?.items?.map((item, index) => ({
          id: index + 1,
          name: `${item.item} (${item.category})`,
          quantity: item.quantity,
          service: item.service,
          price: item.price,
        })) || [],
      subTotal: summary.totalAmount || 0,
      tax: 0,
      total: summary.totalAmount || 0,
      paymentMethod: 'Cash on Delivery',
    };
  }, [orderData]);

  useEffect(() => {
    // Auto navigate to Main screen after 3 seconds
    const timer = setTimeout(() => {
       navigation.replace('Main', { screen: 'Orders' }); // or navigation.navigate('Main')
    }, 3500);

    return () => clearTimeout(timer); // cleanup
  }, [navigation]);

  // const orderDetails = {
  //   orderId: '22145052',
  //   orderDate: '25 June, 2018',
  //   pickupDate: 'Today, 21 June',
  //   pickupTime: '01:00 pm - 02:00 pm',
  //   deliveryDate: 'Tomorrow, 22 June',
  //   deliveryTime: '09:00 am - 10:00 am',
  //   address: 'B11 Old Ford Street, Workshop tower..',
  //   items: [
  //     {
  //       id: 1,
  //       name: 'Shirts (Man)',
  //       quantity: 2,
  //       service: 'Wash & Iron',
  //       price: 20,
  //     },
  //     {
  //       id: 2,
  //       name: 'Trouser (Man)',
  //       quantity: 3,
  //       service: 'Wash & Iron',
  //       price: 25,
  //     },
  //     {
  //       id: 3,
  //       name: 'Jeans (Man)',
  //       quantity: 1,
  //       service: 'Wash & Fold',
  //       price: 10,
  //     },
  //     {
  //       id: 4,
  //       name: 'T-shirt (Woman)',
  //       quantity: 2,
  //       service: 'Wash & Iron',
  //       price: 18,
  //     },
  //   ],
  //   subTotal: 73,
  //   tax: 5,
  //   total: 78,
  //   paymentMethod: 'Cash on Delivery',
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          onBackPress={() => navigation.goBack()}
          titleStyle={{ marginHorizontal: 20 }}
          containerStyle={{ justifyContent: 'flex-start' }}
          title={`Order No. ${orderDetails.orderId}`}
        />
        {/* Status with custom progress circle */}
        <View style={styles.statusCard}>
          <View style={styles.progressCircle}>
            <Icon
              name="clipboard-check-outline"
              size={30}
              color={appColors.blue}
            />
          </View>

          <View style={{ marginLeft: 16 }}>
            <Text style={styles.statusLabel}>Order Status</Text>
            <Text style={styles.statusValue}>Order Confirmed</Text>
            <Text style={styles.orderDate}>{orderDetails.orderDate}</Text>
          </View>
        </View>
        <View style={styles.horizontalBorder} />
        {/* Pickup & Delivery */}
        <View style={styles.timeContainer}>
          <View style={styles.timeBox}>
            <Text style={styles.grayLabel}>Pick up</Text>
            <Text style={styles.timeTitle}>{orderDetails.pickupDate}</Text>
            <Text style={styles.timeValue}>{orderDetails.pickupTime}</Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.grayLabel}>Delivery</Text>
            <Text style={styles.timeTitle}>{orderDetails.deliveryDate}</Text>
            <Text style={styles.timeValue}>{orderDetails.deliveryTime}</Text>
          </View>
        </View>

        {/* Address */}
        <View style={styles.addressBox}>
          <Text style={styles.grayLabel}>Pick up Address</Text>
          <Text style={styles.addressValue}>{orderDetails.address}</Text>
        </View>

        {/* Items */}
        <View style={styles.itemList}>
          <Text style={styles.itemHeader}>Cloth List</Text>
          {orderDetails.items.map(item => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemName}>
                {item.quantity} x {item.name}
              </Text>
              <Text style={styles.itemService}>{item.service}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: appColors.black, marginTop: 1 }}>₹</Text>
                <Text>{item.price}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalBox}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Sub Total</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: appColors.black, marginTop: 1 }}>₹</Text>
              <Text style={styles.totalValue}>{orderDetails.subTotal}</Text>
            </View>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: appColors.black, marginTop: 1 }}>₹</Text>
              <Text style={styles.totalValue}>{orderDetails.tax}</Text>
            </View>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.paymentMethod}>
              Paid via {orderDetails.paymentMethod}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: appColors.blue, marginTop: 2 }}>₹</Text>
              <Text style={styles.totalFinal}>{orderDetails.total}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderConfirmation;
