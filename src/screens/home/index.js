import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from '../home/header'
import ServiceList from '../home/serviceList'
import PopularLaundry from '../home/popularLaundry'
import appColors from "../../theme/appColors";
import BannerOffers from "../home/offerBanner"
import { windowHeight } from "../../theme/appConstant";

export const Home = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}  style={styles.container} showsVerticalScrollIndicator={false}>
     <View style={styles.mainView}>
       <Header navigation={navigation}/>
        <ServiceList navigation={navigation} />
     </View>
     <BannerOffers/>
    <PopularLaundry navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:appColors.background,
   
  },
  mainView:{
     backgroundColor:"#07172cff",
     marginBottom:windowHeight(12),
  },
  contentContainerStyle:{
    paddingBottom:120
  }
});


