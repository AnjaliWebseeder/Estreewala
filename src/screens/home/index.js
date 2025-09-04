import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from '../home/header'
import ServiceList from '../home/serviceList'
import BannerOffer from '../home/offerBanner'
import PopularLaundry from '../home/popularLaundry'
import appColors from "../../theme/appColors";

export const Home = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}  style={styles.container} showsVerticalScrollIndicator={false}>
     <View style={styles.mainView}>
       <Header navigation={navigation}/>
        <ServiceList />
     </View>
     <BannerOffer />
    <PopularLaundry />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
   
  },
  mainView:{
     backgroundColor:appColors.lightBlue,
      paddingHorizontal: 16,
  },
  contentContainerStyle:{
    paddingBottom:100
  }
});


