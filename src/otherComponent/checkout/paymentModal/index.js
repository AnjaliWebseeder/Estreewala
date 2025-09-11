import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { modalStyles } from "../styles";
import appColors from "../../../theme/appColors";
import { windowHeight } from "../../../theme/appConstant";
import { razorImg , cashpayment } from "../../../utils/images/images";
import FastImage from "react-native-fast-image";
import { styles } from "../../addressModal/styles";

export const PaymentModal = ({ visible, onClose, selectedMethod, onSelectMethod, onConfirmPayment }) => {
  const paymentMethods = [
    { id: 'card', name: 'Razor Pay', icon: razorImg },

    { id: 'cash', name: 'Cash on Delivery', icon: cashpayment },
  ];

  return (
    <Modal visible={visible} animationType={"none"} transparent>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <View style={[modalStyles.modalHeader,{marginBottom:windowHeight(5)}]}>
            <Text style={modalStyles.modalTitle}>Select Payment Method</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={paymentMethods}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  modalStyles.paymentItem,
                  selectedMethod === item.id 
                ]}
                onPress={() => onSelectMethod(item.id)}
              >
              <FastImage source={item.icon} style={modalStyles.iconStyle}/>
                <Text style={[
                  modalStyles.paymentText,
                  selectedMethod === item.id && modalStyles.paymentTextSelected
                ]}>
                  {item.name}
                </Text>
                {selectedMethod === item.id && (
                  <Icon name="checkmark-circle" size={22} color={appColors.blue} />
                )}
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity 
            style={modalStyles.payButton}
            onPress={onConfirmPayment}
          >
            <Text style={modalStyles.payButtonText}>Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};