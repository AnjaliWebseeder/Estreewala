import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { dryWash } from '../../../utils/images/images'
import { wash } from "../../../utils/images/images";
import { ironing } from "../../../utils/images/images";
import { SpinWashing } from "../../../utils/images/images";
import { SteamWashing } from "../../../utils/images/images";
import { SteamIroning } from "../../../utils/images/images";
import { StainRemoval } from "../../../utils/images/images";
import { tShirtWashIron, socksClean } from "../../../utils/images/images";
import { fontSizes, windowHeight, windowWidth } from "../../../theme/appConstant";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";

const services = [
  { id: 1, name: "Ironing", icon: ironing },
  { id: 2, name: "Washing", icon: wash },
  { id: 3, name: "Dry Wash", icon: dryWash },
  { id: 4, name: "Wash & Iron", icon: tShirtWashIron },
  { id: 5, name: "Steam Ironing", icon: SteamIroning },
  { id: 6, name: "Spin Washing", icon: SpinWashing },
  { id: 7, name: "Steam Washing", icon: SteamWashing },
  { id: 8, name: "Stain Removal", icon: StainRemoval },
];

const ServiceList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle} horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate('Tabs', {
                screen: 'Laundry',
                params: { serviceName: service.name }
              })
            }
          >
            <Image source={service.icon} style={styles.icon} />
            <Text style={styles.name} numberOfLines={2} textAlign="center">
              {service.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: windowHeight(4),
    paddingLeft: 16,
  },
  scroll: { marginVertical: 10 },
  contentContainerStyle: {
    paddingBottom: 14,
    paddingHorizontal: 1,
    paddingRight: windowHeight(10)
  },
  card: {
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: windowHeight(10),
    borderRadius: 12,
    marginRight: 8,
    alignItems: "center",
    width: windowWidth(110),
  },
  icon: {
    width: windowHeight(40),
    height: windowHeight(30),
    resizeMode: "contain",
  },

  name: {
    fontSize: fontSizes.FONT13,
    fontFamily: fonts.InterRegular,
    textAlign: "center",
    color: appColors.black,
    lineHeight: 18,
  },
});

export default ServiceList;
