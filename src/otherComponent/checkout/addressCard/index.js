import { 
  View, 
  Text, 
  TouchableOpacity, 
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { addressStyles } from "./styles";
import appColors from "../../../theme/appColors";
export const AddressCard = ({ address, onPress, showEdit }) => {
  if (!address) {
    return (
      <TouchableOpacity style={addressStyles.card} onPress={onPress}>
        <View style={addressStyles.cardContent}>
          <View style={addressStyles.textContainer}>
            <Text style={addressStyles.placeholderSubtext}>B 101, Nirvana Point, Hemllition</Text>
          </View>
        <Text style={addressStyles.titleStyle}>Add Address</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
   <TouchableOpacity onPress={onPress}>
  <View style={addressStyles.cardContent}>
    <View style={addressStyles.textContainer}>
      <Text style={addressStyles.addressText} numberOfLines={2}>
        123 Main Street, New York, NY 10001
      </Text>
    </View>
    {showEdit && (
      <TouchableOpacity style={addressStyles.editButton}>
        <Icon name="pencil-outline" size={15} color="#666" />
      </TouchableOpacity>
    )}
  </View>
</TouchableOpacity>

  );
};