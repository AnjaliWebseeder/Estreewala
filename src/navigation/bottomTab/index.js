import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View,Text } from 'react-native';
import {Home} from "../../screens/home";
import Order from "../../screens/order";
import Profile from "../../screens/profile";
import { HomeIcon } from "../../assets/Icons/svg/home";
import {LaundryIcon} from '../../assets/Icons/svg/laundriesIcon'
import OrderIcon from '../../assets/Icons/svg/order';
import { ProfileIcon } from "../../assets/Icons/svg/profile";
import {styles} from './styles'
import appColors from "../../theme/appColors";
import fonts from '../../theme/appFonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {TabBackground} from '../../otherComponent/tabBackground'
import LaundryServiceList from '../../otherComponent/home/laundryServiceList';

const Tab = createBottomTabNavigator();

const MinimalTabButton = ({ focused, icon: IconComponent, label }) => {
  return (
    <View style={styles.minimalTabButton}>
      <View style={[
        styles.minimalIconContainer,
        focused && styles.minimalIconContainerActive
      ]}>
        <IconComponent
          size={20}
          color={focused ? appColors.white : appColors.subTitle}
        />
      </View>
     <Text style={[
        styles.minimalTabLabel,
        { 
          color: focused ? appColors.blue : appColors.subTitle,
          fontFamily: focused ? fonts.PoppinsMedium : fonts.PoppinsRegular
        }
      ]}>
        {label}
      </Text>
    </View>
  );
};

export default function BottomTab() {
    const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: [styles.minimalTabBar,{
             height: 72+ insets.bottom, 
          }],
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={Home}
          options={{
            tabBarBackground: () => <TabBackground height={80} />,
            tabBarIcon: ({ focused }) => (
              <MinimalTabButton 
                focused={focused} 
                icon={HomeIcon} 
                label="Home" 
              />
            ),
          }}
        />
        
        <Tab.Screen
  name="NearbyLaundry"
  component={LaundryServiceList}

    options={{
             tabBarBackground: () => <TabBackground height={80} />,
            tabBarIcon: ({ focused }) => (
              <MinimalTabButton 
                focused={focused} 
                icon={LaundryIcon} 
                label="Laundry" 
              />
            ),
          }}


/>
        <Tab.Screen 
          name="Orders" 
          component={Order}
          options={{
             tabBarBackground: () => <TabBackground height={80} />,
            tabBarIcon: ({ focused }) => (
              <MinimalTabButton 
                focused={focused} 
                icon={OrderIcon} 
                label="Orders" 
              />
            ),
          }}
        />

       


      
        <Tab.Screen 
          name="Profile" 
          component={Profile}
          options={{
             tabBarBackground: () => <TabBackground height={80} />,
            tabBarIcon: ({ focused }) => (
              <MinimalTabButton 
                focused={focused} 
                icon={ProfileIcon} 
                label="Profile" 
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}

