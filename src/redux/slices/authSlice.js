import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CUSTOMER_REGISTER, SEND_OTP, VERIFY_OTP, UPDATE_PROFILE } from "../../services/api"


// Register Customer
export const registerCustomer = createAsyncThunk(
  "auth/registerCustomer",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("📝 Registering customer:", userData);
      
      const payload = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: "customer" // static as requested
      };

      const response = await axios.post(CUSTOMER_REGISTER, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      console.log("✅ Customer Registration Response:", response.data);
      return response.data;
      
    } catch (error) {
      console.log("❌ Customer Registration Error:", error);
      
      let errorMessage = "Registration failed, please try again";
      
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Send OTP
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (phoneData, { rejectWithValue }) => {
    try {
      console.log("📱 Sending OTP to:", phoneData.phone);
      
      const response = await axios.post(SEND_OTP, phoneData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      console.log("✅ Send OTP Response:", response.data);
      return response.data;
      
    } catch (error) {
      console.log("❌ Send OTP Error:", error);
      
      let errorMessage = "Failed to send OTP, please try again";
      
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      console.log("🔐 Verifying OTP for:", otpData.phone);
      
      const response = await axios.post(VERIFY_OTP, otpData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      console.log("✅ Verify OTP Response:", response.data);
      return response.data;
      
    } catch (error) {
      console.log("❌ Verify OTP Error:", error);
      
      let errorMessage = "OTP verification failed";
      
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Update Profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      console.log("👤 Updating profile:", profileData);
      
      const response = await axios.post(UPDATE_PROFILE, profileData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      console.log("✅ Update Profile Response:", response.data);
      return response.data;
      
    } catch (error) {
      console.log("❌ Update Profile Error:", error);
      
      let errorMessage = "Profile update failed";
      
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // Registration
    registerLoading: false,
    registerSuccess: false,
    registerError: null,
    
    // OTP
    otpLoading: false,
    otpSent: false,
    otpError: null,
    
    // Verification
    verifyLoading: false,
    verifySuccess: false,
    verifyError: null,
    
    // Profile
    profileLoading: false,
    profileSuccess: false,
    profileError: null,
    
    // User Data
    user: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    // Reset states
    resetRegisterState: (state) => {
      state.registerLoading = false;
      state.registerSuccess = false;
      state.registerError = null;
    },
    resetOtpState: (state) => {
      state.otpLoading = false;
      state.otpSent = false;
      state.otpError = null;
    },
    resetVerifyState: (state) => {
      state.verifyLoading = false;
      state.verifySuccess = false;
      state.verifyError = null;
    },
    resetProfileState: (state) => {
      state.profileLoading = false;
      state.profileSuccess = false;
      state.profileError = null;
    },
    clearAllErrors: (state) => {
      state.registerError = null;
      state.otpError = null;
      state.verifyError = null;
      state.profileError = null;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.otpSent = false;
      state.verifySuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Customer
      .addCase(registerCustomer.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
        state.registerSuccess = false;
      })
      .addCase(registerCustomer.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerSuccess = true;
        state.registerError = null;
        state.user = action.payload.customer;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        console.log("CUSTOMER REGISTERED SUCCESSFULLY => ", action.payload);
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerSuccess = false;
        state.registerError = action.payload;
        console.log("CUSTOMER REGISTRATION FAILED => ", action.payload);
      })
      // Send OTP
      .addCase(sendOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
        state.otpSent = false;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otpSent = true;
        state.otpError = null;
        console.log("OTP SENT SUCCESSFULLY => ", action.payload);
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpSent = false;
        state.otpError = action.payload;
        console.log("OTP SENDING FAILED => ", action.payload);
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.verifyLoading = true;
        state.verifyError = null;
        state.verifySuccess = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.verifyLoading = false;
        state.verifySuccess = true;
        state.verifyError = null;
        state.user = action.payload.customer;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.otpSent = false;
        console.log("OTP VERIFIED SUCCESSFULLY => ", action.payload);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifySuccess = false;
        state.verifyError = action.payload;
        console.log("OTP VERIFICATION FAILED => ", action.payload);
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
        state.profileSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profileSuccess = true;
        state.profileError = null;
        state.user = { ...state.user, ...action.payload.user };
        console.log("PROFILE UPDATED SUCCESSFULLY => ", action.payload);
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileSuccess = false;
        state.profileError = action.payload;
        console.log("PROFILE UPDATE FAILED => ", action.payload);
      });
  },
});

export const { 
  resetRegisterState, 
  resetOtpState, 
  resetVerifyState, 
  resetProfileState, 
  clearAllErrors,
  setCredentials,
  logout 
} = authSlice.actions;

export default authSlice.reducer;