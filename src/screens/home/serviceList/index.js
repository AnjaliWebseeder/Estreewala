import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import {dryWash} from '../../../utils/images/images'
import { wash } from "../../../utils/images/images";
import { ironing } from "../../../utils/images/images";
import { tShirtWashIron , socksClean} from "../../../utils/images/images";
import { fontSizes, windowHeight, windowWidth } from "../../../theme/appConstant";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";

const services = [
  { id: 1, name: "Dry Wash", icon: dryWash },
  { id: 2, name: "Wash", icon: wash },
  { id: 3, name: "Ironing", icon:ironing },
{ id: 4, name: "WashIron", icon: tShirtWashIron },
// { id: 5, name: "SocksClean", icon: socksClean },
];

const ServiceList = ({navigation}) => {
  return (
   <View style={styles.container}>
     <ScrollView contentContainerStyle={styles.contentContainerStyle} horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      {services.map((service) => (
        <TouchableOpacity  onPress={() => navigation.push('LaundryServiceList',{serviceName: service.name})}  key={service.id} style={styles.card}>
          <Image source={service.icon} style={styles.icon} />
          <Text numberOfLines={1} style={styles.name}>{service.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
   </View>
  );
};

const styles = StyleSheet.create({
  container:{
    marginTop:windowHeight(4),
     paddingLeft: 16,
  },
  scroll: { marginVertical: 10 },
  contentContainerStyle:{
    paddingBottom:14,
    paddingHorizontal:1
  },
  card: {
    backgroundColor: appColors.lightBlue,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 8,
    alignItems: "center",
    width: windowWidth(110),
   
  },
  icon: { width: windowHeight(70), height: windowWidth(85), resizeMode: "contain" },
  name: { fontSize: fontSizes.FONT14,fontFamily:fonts.InterRegular,marginBottom:8,color:appColors.white },
});

export default ServiceList;
