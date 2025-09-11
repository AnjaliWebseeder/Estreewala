
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles'

const EmptyCart = ({ onBrowseServices }) => {
  return (
    <View style={styles.emptyCartContainer}>
      <Icon name="remove-shopping-cart" size={48} color="#ccc" />
      <Text style={styles.emptyCartText}>Your cart is empty</Text>
      <TouchableOpacity 
        style={styles.browseButton}
        onPress={onBrowseServices}
      >
        <Text style={styles.browseButtonText}>Browse Laundry Services</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCart;