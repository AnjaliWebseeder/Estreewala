import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MenuIcon } from '../../../assets/Icons/svg/menu';
import { BellIcon } from '../../../assets/Icons/svg/bell';
import { styles } from './styles';
import { useDrawer } from "../../../navigation/customDrawer/drawerContext";
import appColors from "../../../theme/appColors";
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAddresses } from "../../../redux/slices/addressSlice";
import { fetchNotifications } from "../../../redux/slices/notificationSlice";
import LocationRequiredModal from '../../../otherComponent/LocationRequiredModal/LocationRequiredModal';

const Header = ({ navigation }) => {
    const dispatch = useDispatch();
    const { openDrawer } = useDrawer();
    const [showLocationModal, setShowLocationModal] = useState(false);

    const unreadCount = useSelector(
        state => state.notification?.unreadCount ?? 0
    );

    const { selectedAddress, addresses } = useSelector(
        state => state.address
    );

    // ✅ EFFECTIVE ADDRESS (declare first)
    const effectiveAddress =
        selectedAddress ||
        addresses.find(a => a.isDefault) ||
        addresses[0];

    useEffect(() => {
        dispatch(getAddresses());
        dispatch(fetchNotifications());
    }, [dispatch]);

    // ✅ SHOW MODAL IF NO ADDRESS
    useEffect(() => {
        if (!effectiveAddress || addresses.length === 0) {
            setShowLocationModal(true);
        } else {
            setShowLocationModal(false);
        }
    }, [effectiveAddress, addresses]);

    const handleMenuPress = () => {
        openDrawer();
    };

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleMenuPress}
                    style={styles.iconCircle}
                >
                    <MenuIcon />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.addressContainer}
                    onPress={() => navigation.navigate("ManageAddress")}
                    activeOpacity={0.7}
                >
                    <Ionicons name="location-sharp" size={14} color="#fff" />

                    <View style={{ marginLeft: 6 }}>
                        <Text style={styles.addressTitle}>
                            {effectiveAddress?.type || "Add Address"}
                        </Text>

                        {effectiveAddress && (
                            <Text style={styles.addressSub} numberOfLines={1}>
                                {effectiveAddress.addressLine1}
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>

                <View style={styles.actions}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Notification')}
                        style={styles.iconCircle}
                    >
                        <BellIcon color={appColors.primary} />

                        {unreadCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{unreadCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.title}>
                Which laundry service do you need today?
            </Text>

            {/* ✅ FORCE LOCATION MODAL */}
            <LocationRequiredModal
                visible={showLocationModal}
                onManageAddress={() => {
                    setShowLocationModal(false);
                    navigation.navigate('ManageAddress');
                }}
            />
        </>
    );
};

export default Header;
