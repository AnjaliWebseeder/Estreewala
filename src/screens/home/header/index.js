import { View, Text, TouchableOpacity } from "react-native";
import {MenuIcon} from '../../../assets/Icons/svg/menu'
import {SearchIcon} from '../../../assets/Icons/svg/search'
import {BellIcon} from '../../../assets/Icons/svg/bell'
import {styles} from './styles'
import { useDrawer } from "../../../navigation/customDrawer/drawerContext";

const Header = (props) => {
    const { openDrawer } = useDrawer();
    
    // Add console log to debug
  const handleMenuPress = () => {
        console.log("Menu button pressed");
        openDrawer();
    };
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handleMenuPress()}>
                    <MenuIcon/>
                </TouchableOpacity>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Notification')}>
                        <BellIcon/>
                    </TouchableOpacity>
                    <View style={styles.iconStyle}/>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Search")}>
  <SearchIcon/>
                    </TouchableOpacity>
                  
                </View>
            </View>
            <Text style={styles.title}>Which laundry service do you need today?</Text>
        </>
    );
};

export default Header;