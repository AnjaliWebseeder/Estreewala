import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles'
import FilterIcon from '../../assets/Icons/svg/filter' 
import appColors from '../../theme/appColors';

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search...",
  showFilter = true,
  onFilterPress,
  containerStyle,
  inputStyle,
  filterButtonStyle,
  placeholderTextColor = "#999",
  searchInputContainerStyle,
  ...props
}) => {
  return (
    <View style={[styles.searchContainer, containerStyle]}>
      <View style={[styles.searchInputContainer,{...searchInputContainerStyle}]}>
        <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, inputStyle]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderTextColor}
          {...props}
        />
      </View>
   {showFilter && (
        <TouchableOpacity 
          style={[styles.filterButton, filterButtonStyle]}
          onPress={onFilterPress}
        >
     <FilterIcon size={24} color={appColors.white} />
        
        </TouchableOpacity>
      )} 
    </View>
  );
};



export default SearchBar;