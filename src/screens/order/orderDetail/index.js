import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Alert,
  Platform,
  StatusBar
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import appColors from "../../../theme/appColors";
import documentIcon from "../../../assets/Icons/svg/documentIcon";
import deliveryIcon from "../../../assets/Icons/svg/deliveryIcon";
import OrderOnWayIcon from "../../../assets/Icons/svg/orderway";
import PickupOrderIcon from "../../../assets/Icons/svg/pickupOrder";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import CancelOrder from "../../../otherComponent/cancelOrderModal";
import { getStatusSteps } from "../../../utils/statusUtils";
import InvoiceModal from "../../../otherComponent/invoiceModal";
import moment from "moment";
import { windowHeight } from "../../../theme/appConstant";
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder} from "../../../redux/slices/orderSlice";
import { getItemImage } from "../../../utils/data/imageMapping"
import { updateOrderStatus} from "../../../redux/slices/myOrderSlice";
import { useToast } from "../../../utils/context/toastContext";

const OrderDetails = ({ navigation, route }) => {
  const { order } = route.params || {};
    const [currentOrder, setCurrentOrder] = useState(order || {});
  const [isCancelModalVisible, setCancelModalVisible] = useState(false);
  const [isInvoiceModalVisible, setInvoiceModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [downloadingInvoice, setDownloadingInvoice] = useState(false);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { cancellingOrder } = useSelector(state => state.order);
  // Update currentOrder when route params change

  useEffect(() => {
    console.log("order",order);
    if (order) {
      setCurrentOrder(order);
    }
  }, [order]);

  const handleCancelOrder = () => {
    setCancelModalVisible(true);
  };

  const handleDownloadInvoice = () => {
    setInvoiceModalVisible(true);
  };

  // Updated handleDownloadPDF for Android download
  const handleDownloadPDF = async () => {
    try {
      setDownloadingInvoice(true);
      
      if (Platform.OS === 'android') {
        // For Android, we'll use the WebView print functionality
        // The actual download will be handled in the InvoiceModal
       
      } else {
        // For iOS, show message
      
      }
    } catch (error) {
      console.error('PDF download failed:', error);
    
    } finally {
      setDownloadingInvoice(false);
    }
  };

    const confirmCancel = async (reason) => {
  try {
    console.log('🔄 Cancelling order with reason:', reason);
    
    // 1. API call to cancel
  await dispatch(cancelOrder({ 
      orderId: order?.id, 
      reason: reason 
    })).unwrap();
    
    // 2. Update Redux state IMMEDIATELY
    dispatch(updateOrderStatus({
      orderId: order?.id,
      newStatus: "cancelled" // Use whatever status your API returns
    }));
    
    // 3. Update local UI
    setCurrentOrder((prev) => ({
      ...prev,
      status: "cancelled",
    }));
    
    // 4. Close modal
    setCancelModalVisible(false);
    setSelectedReason('');
    setOtherReason('');

   showToast("Cancelled Order successfully!", "success");
    
    // 5. Go back after brief delay for smooth UX
    setTimeout(() => {
      navigation.goBack();
    }, 800);
    
  } catch (error) {
    console.log('Order cancellation error:', error);
  }
};


  const customerPhone = order?.contactDetails?.mobile || "";

  const handleCall = () => {
    if (customerPhone) {
      Linking.openURL(`tel:${customerPhone}`);
    }
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "documentIcon":
        return documentIcon;
      case "deliveryIcon":
        return deliveryIcon;
      case "OrderOnWayIcon":
        return OrderOnWayIcon;
      case "PickupOrderIcon":
        return PickupOrderIcon;
      default:
        return documentIcon;
    }
  };

  // Use currentOrder.status for timeline and UI updates
  const statusSteps = getStatusSteps(currentOrder.status);

  // Check if order is cancelled
  const isOrderCancelled = currentOrder?.status === "CANCELLED";
  const isOrderCompleted = currentOrder?.status === "completed";
 



  // Get status display text and color
  const getStatusDisplay = () => {
    switch (currentOrder?.status) {
      case "CANCELLED":
        return { text: "Cancelled", color: "#FF3B30" };
      case "COMPLETED":
        return { text: "Completed", color: "#4CAF50" };
      case "PENDING":
        return { text: "Pending", color: "#FF9800" };
      case "ACCEPTED":
        return { text: "Accepted", color: "#2196F3" };
      default:
        return { text: currentOrder?.status || "Unknown", color: appColors.gray };
    }
  };

  const statusDisplay = getStatusDisplay();


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.container}
      >
        <Header onBackPress={() => navigation.goBack()} title={"Order Details"} />

        {/* Order Timeline */}
        <View style={styles.timeline}>
          {statusSteps.map((step, index, arr) => {
            const IconComponent = getIconComponent(step.icon);
            return (
              <View key={index} style={styles.stepContainer}>
                <View style={styles.iconColumn}>
                  <View
                    style={[styles.imageView, { backgroundColor: step.bgColor }]}
                  >
                    <IconComponent />
                  </View>
                </View>

                <View style={styles.stepText}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDate}>{step.date}</Text>
                </View>

                <View style={styles.rightColumn}>
                  <Ionicons
                    style={{ marginTop: -8 }}
                    name={step.completed ? "checkmark-circle" : "ellipse-outline"}
                    size={22}
                    color={step.completed ? "green" : "gray"}
                  />
                  {index !== arr.length - 1 && (
                    <View style={styles.dottedLine} />
                  )}
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
              <Text style={styles.driverName}>
                {order?.contactDetails?.fullName || "Unknown"}
              </Text>
              <Text style={styles.driverCar}>
                {order?.deliveryAddress?.address || "No address available"}
              </Text>
              <Text style={styles.driverPhone}>{customerPhone}</Text>
            </View>
            <TouchableOpacity onPress={handleCall}>
              <Ionicons name="call" size={20} color={appColors.darkBlue} />
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.addressBlock}>
            <MaterialIcons
              name="local-laundry-service"
              size={20}
              color={appColors.darkBlue}
            />
            <Text style={styles.addressText}>
             {""} {order?.vendor?.businessName || "Unknown Laundry"}{" "}
             
            </Text>
          </View>
          <View style={styles.addressBlock}>
            <Ionicons
              name="location-outline"
              size={20}
              color={appColors.darkBlue}
            />
            <Text style={styles.addressText}>
              {order?.vendor?.address || ""}
            </Text>
          </View>
        </View>

        {/* Ordered Items */}
        <View style={[styles.card, { marginVertical: 3 }]}>
          <Text style={styles.sectionTitle}>Order item(s)</Text>
          {order?.items?.map((item, index) => {
            // Get the appropriate image for each item
            const itemImage = getItemImage(item?.item);
            
            return (
              <View key={index} style={styles.itemRow}>
                <Image source={itemImage} style={styles.itemImage} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item?.item}</Text>
                  <Text style={styles.itemService}>
                    {item?.service} · x{item?.quantity}
                  </Text>
                </View>
              </View>
            );
          })}
          <Text style={styles.instruction}>{order?.instructions || ""}</Text>
        </View>

        {/* Invoice Section */}
        <View style={[styles.card, styles.summeryStyle]}>
          <Text style={styles.invoiceId}>Order Id: {'ORD-' + (order?.id || order?._id || '').slice(-5).toUpperCase()}</Text>

         
          
          {/* Status Display with Color */}
          <Text style={[styles.invoiceStatus, { color: statusDisplay.color }]}>
            {statusDisplay.text}
          </Text>

          <View style={styles.summaryRow}>
            <Text style={styles.text}>Date & Time</Text>
            <Text style={styles.subTitle}>
              {moment(order?.createdAt)
                .utcOffset("+05:30")
                .format("DD MMM, hh:mm A")}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.text}>Status</Text>
            <Text style={[styles.subTitle, { color: statusDisplay.color }]}>
              {statusDisplay.text}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.text}>Pickup</Text>
            <Text style={styles.subTitle}>
              {moment(order?.pickupDate).format("DD MMM YYYY")} {order?.pickupTime}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.text}>Delivery</Text>
            <Text style={styles.subTitle}>
               {moment(order?.deliveryDate).format("DD MMM YYYY")} {order?.deliveryTime}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.text}>Address</Text>
            <Text style={[styles.subTitle,{width:230}]}>
              {order?.deliveryAddress?.address}
            </Text>
          </View>

          <View
            style={[
              styles.horizontalLine,
              {
                marginTop: 15,
                borderBottomColor: appColors.font,
                marginBottom: 13,
              },
            ]}
          />
          <View style={styles.summaryRow}>
            <Text style={styles.text}>Sub Total</Text>
            <Text style={styles.subTitle}>₹{order?.totalAmount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.text}>Delivery</Text>
            <Text style={styles.subTitle}>₹0.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>₹{order?.totalAmount}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleDownloadInvoice}
          style={styles.invoiceButton}
        >
          <Text style={styles.invoiceBtnText}>View Invoice</Text>
          <MaterialIcons
            name="description"
            size={20}
            color={appColors.darkBlue}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>

        {/* Cancel Button - Only show if order is NOT cancelled and NOT completed */}
        {currentOrder?.status === "pending" && (
          <TouchableOpacity 
            style={[styles.cancelButton, cancellingOrder && styles.cancelButtonDisabled]} 
            onPress={handleCancelOrder}
            disabled={cancellingOrder}
          >
            {cancellingOrder ? (
              <ActivityIndicator size="small" color={appColors.white} />
            ) : (
              <Text style={styles.cancelBtnText}>Cancel Order</Text>
            )}
          </TouchableOpacity>
        )}

        {/* Cancelled Order Message */}
        {isOrderCancelled && (
          <View style={styles.cancelledMessage}>
            <Ionicons name="close-circle" size={24} color="#FF3B30" />
            <Text style={styles.cancelledText}>This order has been cancelled</Text>
          </View>
        )}

        <CancelOrder
          visible={isCancelModalVisible}
          onClose={() => {
            setCancelModalVisible(false);
            setSelectedReason('');
            setOtherReason('');
          }}
          onConfirm={confirmCancel}
          orderId={order?.id}
          selectedReason={selectedReason}
          setSelectedReason={setSelectedReason}
          otherReason={otherReason}
          setOtherReason={setOtherReason}
          isLoading={cancellingOrder}
        />

        <InvoiceModal
          visible={isInvoiceModalVisible}
          onClose={() => setInvoiceModalVisible(false)}
          order={currentOrder} // Pass currentOrder to show updated status
          onDownload={handleDownloadPDF}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;