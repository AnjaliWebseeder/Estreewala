import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { fontSizes } from "../../../theme/appConstant";

export const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#fff"},
  header:{flexDirection:"row",alignItems:"center",padding:16,borderBottomWidth:1,borderBottomColor:"#eee"},
  title:{fontSize:18,fontFamily:fonts.PoppinsMedium,marginLeft:12,color:"#363f64"},
  searchContainer:{flexDirection:"row",alignItems:"center",padding:12,borderBottomWidth:1,borderBottomColor:"#eee"},
  input:{flex:1,marginLeft:10,fontSize:16,color:"#333"},
  item:{flexDirection:"row",alignItems:"center",padding:16,borderBottomWidth:1,borderBottomColor:"#f0f0f0"},
  itemName:{fontSize:16,fontFamily:fonts.PoppinsMedium,color:"#363f64"},
  itemDesc:{fontSize:14,color:"#676767"},
});