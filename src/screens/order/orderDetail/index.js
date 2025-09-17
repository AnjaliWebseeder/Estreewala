import React , {useState} from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import appColors from "../../../theme/appColors";
import { service1, service7, service8 } from "../../../utils/images/images";
import documentIcon from '../../../assets/Icons/svg/documentIcon'
import deliveryIcon from '../../../assets/Icons/svg/deliveryIcon'
import OrderOnWayIcon from '../../../assets/Icons/svg/orderway'
import PickupOrderIcon from '../../../assets/Icons/svg/pickupOrder'
import {styles} from './styles'
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import CancelOrder from '../../../otherComponent/cancelOrderModal'
import {getStatusSteps} from '../../../utils/statusUtils'
import InvoiceModal from '../../../otherComponent/invoiceModal'

const OrderDetails = ({ navigation, route }) => {
   const { order } = route.params || {};
    const [currentOrder, setCurrentOrder] = useState(order || {
    id: "1",
    title: "QuickClean Laundry",
    orderId: "AD323453",
    date: "20 Jun, 10:20 AM",
    items: "2 items",
    price: "13.00",
    status: "NEW",
    statusColor: "#e9fed5",
    textColor: "#34C759",
    image: service1,
  });

    const [isCancelModalVisible, setCancelModalVisible] = useState(false);
     const [isInvoiceModalVisible, setInvoiceModalVisible] = useState(false);
     

  const orderItems = [
    { id: 1, name: "Frock", service: "Wash & Iron", qty: 1, price: 25, image: service7 },
    { id: 2, name: "T-Shirt", service: "Wash & Iron", qty: 1, price: 15, image: service8 },
  ];

  const statusText = {
  NEW: "Order is accepted.",
  WASHING: "Order is being processed.",
  COMPLETED: "Order is completed.",
  DELIVERY: "Order will be delivered soon.",
  CANCELLED: "Order has been cancelled.",
};

 const handleCancelOrder = () => {
    setCancelModalVisible(true);
  };


    const handleDownloadInvoice = () => {
    setInvoiceModalVisible(true);
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download logic here
    console.log("Downloading invoice PDF...");
  };


  const confirmCancel = () => {
    // Update the order status to cancelled
    setCurrentOrder(prev => ({
      ...prev,
      status: "CANCELLED",
      statusColor: "#ffecee",
      textColor: "#e53935"
    }));
    setCancelModalVisible(false);
    
    // Here you would typically update your backend as well
  };

  const customerPhone = "+911234567890";

  const handleCall = () => {
    Linking.openURL(`tel:${customerPhone}`);
  };

  
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'documentIcon': return documentIcon;
      case 'deliveryIcon': return deliveryIcon;
      case 'OrderOnWayIcon': return OrderOnWayIcon;
      case 'PickupOrderIcon': return PickupOrderIcon;
      case 'cancelIcon': return cancelIcon;
      default: return documentIcon;
    }
  };


    const statusSteps = getStatusSteps(currentOrder.status);

  return (
  <SafeAreaView  style={styles.container}>
      <ScrollView  contentContainerStyle={styles.contentContainerStyle} style={styles.container}>
        <Header onBackPress={() => navigation.goBack()} title={'Order Details'}/>
   {/* Order Timeline */}
  <View style={styles.timeline}>
          {statusSteps.map((step, index, arr) => {
            const IconComponent = getIconComponent(step.icon);
            return (
              <View key={index} style={styles.stepContainer}>
                {/* Left Icon */}
                <View style={styles.iconColumn}>
                  <View style={[styles.imageView, {backgroundColor: step.bgColor}]}>
                    <IconComponent/>
                  </View>
                </View>

                {/* Text */}
                <View style={styles.stepText}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDate}>{step.date}</Text>
                </View>

                {/* Right Side (Check + Dashed Line) */}
                <View style={styles.rightColumn}>
                  <Ionicons style={{marginTop:-8}}
                    name={step.completed ? "checkmark-circle" : "ellipse-outline"}
                    size={22}
                    color={step.completed ? "green" : "gray"}
                  />
                  {index !== arr.length - 1 && <View style={styles.dottedLine} />}
                </View>
              </View>
            );
          })}
        </View>



      {/* Customer Details */}
     <View style={styles.card}>
        <Text style={styles.sectionTitle}>Customer Details</Text>
        <View style={styles.driverRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.driverName}>George Anderson</Text>
            <Text style={styles.driverCar}>Navapura R.V Desai road jataratna 203,surat, india</Text>
            <Text style={styles.driverPhone}>{customerPhone}</Text>
          </View>
          <TouchableOpacity onPress={handleCall}>
            <Ionicons name="call" size={20} color={appColors.blue} />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine}/>
        <View style={styles.addressBlock}>
          <MaterialIcons name="local-laundry-service" size={20} color={appColors.font} />
          <Text style={styles.addressText}>QuickClean Laundry, 1141 Central Park, Hemilton</Text>
        </View>
        <View style={styles.addressBlock}>
          <Ionicons name="location-outline" size={20} color={appColors.font} />
          <Text style={styles.addressText}>B101, Nirvana Point, Hemilton</Text>
        </View>
      </View> 

      {/* Order Items */}
       <View style={[styles.card,{paddingTop:0,marginVertical:3}]}>
        <Text style={styles.sectionTitle}>Ordered item(s)</Text>
        {orderItems.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemService}>{item.service} · x{item.qty}</Text>
            </View>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          </View>
        ))}
        <Text style={styles.instruction}>Stains on back of shirt</Text>
      </View>

      {/* Invoice */}
      <View style={[styles.card,styles.summeryStyle]}>
        <Text style={styles.invoiceId}>Order Id: #{currentOrder.orderId}</Text>
          <Text style={styles.invoiceStatus}>{currentOrder.status}</Text>

        <View style={styles.summaryRow}><Text style={styles.text}>Date & Time</Text><Text style={styles.subTitle}>{currentOrder.date}</Text></View>
        
        <View style={styles.summaryRow}><Text  style={styles.text}>Status</Text>
         <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {currentOrder.status === 'DELIVERY' && (
                <MaterialIcons name="local-shipping" size={16} color={appColors.blue} style={{marginRight: 5}} />
              )}
              {currentOrder.status === 'CANCELLED' && (
                <MaterialIcons name="cancel" size={16} color="#e53935" style={{marginRight: 5}} />
              )}
              <Text style={[styles.subTitle, 
                {color: currentOrder.status === 'CANCELLED' ? '#e53935' : appColors.font}
              ]}>
                {currentOrder.status}
              </Text>
            </View>
        </View>
        <View style={styles.summaryRow}><Text  style={styles.text}>Pickup</Text><Text style={styles.subTitle}>11 Jan 2020, 10:30 AM</Text></View>
        <View style={styles.summaryRow}><Text  style={styles.text}>Delivery</Text><Text style={styles.subTitle}>11 Jan 2020, 10:30 AM</Text></View>
        <View style={styles.summaryRow}><Text  style={styles.text} >Address</Text><Text style={styles.subTitle}>B 250 Basket Street</Text></View>
         <View style={[styles.horizontalLine,{marginTop:15,borderBottomColor:appColors.font,marginBottom:13}]}/>
        <View style={styles.summaryRow}><Text  style={styles.text}>Sub Total</Text><Text style={styles.subTitle}>₹24.00</Text></View>
        <View style={styles.summaryRow}><Text  style={styles.text}>Delivery</Text><Text style={styles.subTitle}>₹1.00</Text></View>
        <View style={styles.summaryRow}><Text style={styles.totalText}>Total</Text><Text style={styles.totalText}>₹40.00</Text></View>

       
      </View> 
       <TouchableOpacity onPress={handleDownloadInvoice} style={styles.invoiceButton}>
          <Text style={styles.invoiceBtnText}>View Invoice</Text>
          <MaterialIcons  name="description"  size={20} color={appColors.blue} style={{ marginLeft: 8 }} />
        </TouchableOpacity>

      
       
        {currentOrder.status !== 'CANCELLED' && currentOrder.status !== "COMPLETED" && (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
            <Text style={styles.cancelBtnText}>Cancel Order</Text>
          </TouchableOpacity>
        )}
           <CancelOrder
        visible={isCancelModalVisible}
        onClose={() => setCancelModalVisible(false)}
        onConfirm={confirmCancel}
        orderId={currentOrder.orderId}
      /> 

       <InvoiceModal
          visible={isInvoiceModalVisible}
          onClose={() => setInvoiceModalVisible(false)}
          order={currentOrder}
          onDownload={handleDownloadPDF}
        />
    </ScrollView>
  </SafeAreaView>
  );
};

export default OrderDetails;

