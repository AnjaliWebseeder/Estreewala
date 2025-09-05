import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import {dryWash} from '../../../utils/images/images'
import { wash } from "../../../utils/images/images";
import { ironing } from "../../../utils/images/images";
import { tShirtWashIron } from "../../../utils/images/images";
import { fontSizes, windowHeight, windowWidth } from "../../../theme/appConstant";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";

const services = [
  { id: 1, name: "Dry Wash", icon: dryWash },
  { id: 2, name: "Wash", icon: wash },
  { id: 3, name: "Ironing", icon:ironing },
{ id: 4, name: "WashIron", icon: tShirtWashIron },
];

const ServiceList = () => {
  return (
   <View style={styles.container}>
     <ScrollView contentContainerStyle={styles.contentContainerStyle} horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      {services.map((service) => (
        <TouchableOpacity key={service.id} style={styles.card}>
          <Image source={service.icon} style={styles.icon} />
          <Text style={styles.name}>{service.name}</Text>
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
    paddingBottom:20,
    paddingHorizontal:1
  },
  card: {
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: "center",
    width: windowWidth(120),
    elevation: 3,
  },
  icon: { width: windowHeight(140), height: windowWidth(110), resizeMode: "contain" },
  name: { fontSize: fontSizes.FONT16,fontFamily:fonts.PoppinsRegular,marginBottom:8 },
});

export default ServiceList;
