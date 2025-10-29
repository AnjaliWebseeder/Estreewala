import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, resetProfileState } from "../../../redux/slices/authSlice"
import Header from "../../../components/header";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import appColors from "../../../theme/appColors";

const LoginSecurityScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, profileLoading, profileSuccess, profileError } = useSelector(state => state.auth);
  
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({
    customerId: "CUST12345", // static, non-editable
    username: "",
    email: "",
    contactNo: "",
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  // Initialize form data from user state
  useEffect(() => {
    if (user) {
      setFormData({
        customerId: user.customerId || "CUST12345",
        username: user.name || "",
        email: user.email || "",
        contactNo: user.phone || "",
      });
    }
  }, [user]);

  // Handle profile update success
  useEffect(() => {
    if (profileSuccess) {
      Alert.alert('Success', 'Profile updated successfully');
      setEditMode(null);
      dispatch(resetProfileState());
    }
  }, [profileSuccess, dispatch]);

  // Handle profile update errors
  useEffect(() => {
    if (profileError) {
      Alert.alert('Update Failed', profileError);
    }
  }, [profileError]);

  // Clear states when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetProfileState());
    };
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (formData.contactNo && !/^[0-9]{10}$/.test(formData.contactNo)) {
      newErrors.contactNo = "Invalid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileUpdate = async () => {
    if (!validateForm()) return;

    try {
      const profileData = {
        name: formData.username.trim(),
        email: formData.email.trim(),
      };
      
      await dispatch(updateProfile(profileData)).unwrap();
    } catch (error) {
      // Error is handled in useEffect
      console.log('Profile update error:', error);
    }
  };

  const fields = [
    { label: "Customer ID", key: "customerId", value: formData.customerId, editable: false },
    { label: "Name", key: "username", value: formData.username },
    { label: "Email", key: "email", value: formData.email },
    { label: "Contact", key: "contactNo", value: formData.contactNo , editable: false},
  ];

  return (
    <SafeAreaView style={[styles.container,{paddingHorizontal:0}]}>
      <View style={styles.container}>
        <Header title={"Login & Security"} onBackPress={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.sectionCard}>
              {fields.map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.fieldContainer,
                    { borderBottomWidth: editMode === item.key ? 0 : 1 },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.fieldLabel}>{item.label}</Text>

                    {item.editable === false ? (
                      <Text style={styles.fieldValue}>{item.value}</Text>
                    ) : editMode === item.key ? (
                      <>
                        <TextInput
                          style={[styles.input, focusedField === item.key && styles.inputFocused]}
                          onFocus={() => setFocusedField(item.key)}
                          onBlur={() => setFocusedField(null)}
                          onChangeText={(text) => {
                            setFormData({ ...formData, [item.key]: text });
                            if (errors[item.key]) setErrors({...errors, [item.key]: ""});
                          }}
                          value={formData[item.key]}
                          autoCapitalize={item.key === "email" ? "none" : "words"}
                          underlineColorAndroid="transparent"
                          keyboardType={item.key === "contactNo" ? "numeric" : "default"}
                        />
                        {errors[item.key] && (
                          <Text style={styles.errorText}>{errors[item.key]}</Text>
                        )}
                      </>
                    ) : (
                      <Text style={styles.fieldValue}>{item.value}</Text>
                    )}
                  </View>

                  {item.editable !== false && (
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => {
                        if (editMode === item.key) {
                          setEditMode(null);
                          setErrors({});
                        } else {
                          setEditMode(item.key);
                        }
                      }}
                    >
                      {editMode === item.key ? (
                        <Icon name="close-circle-outline" size={22} color="#FF3B30" />
                      ) : (
                        <Icon name="create-outline" size={22} color={appColors.blue} />
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              {editMode && (
                <TouchableOpacity 
                  style={styles.saveButton} 
                  onPress={handleProfileUpdate}
                  disabled={profileLoading}
                >
                  {profileLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginSecurityScreen;