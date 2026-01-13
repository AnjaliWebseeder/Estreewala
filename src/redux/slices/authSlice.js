import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SEND_OTP, VERIFY_OTP, UPDATE_PROFILE } from "../../services/api";

/* ================= SEND OTP ================= */
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async ({ phone }, { rejectWithValue }) => {
    try {
      console.log("📱 SEND OTP REQUEST:", phone);

      const res = await axios.post(
        SEND_OTP,
        { phone },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ SEND OTP RESPONSE:", res.data);
      return { phone, ...res.data };
    } catch (err) {
      console.log("❌ SEND OTP ERROR:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

/* ================= VERIFY OTP ================= */
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      console.log("🔐 VERIFY OTP REQUEST:", { phone, otp });

      const res = await axios.post(
        VERIFY_OTP,
        { phone, otp },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ VERIFY OTP RESPONSE:", res.data);
      return res.data;
    } catch (err) {
      console.log("❌ VERIFY OTP ERROR:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Invalid OTP"
      );
    }
  }
);

/* ================= UPDATE PROFILE ================= */
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      console.log("👤 UPDATE PROFILE REQUEST:", profileData);

      const res = await axios.post(
        UPDATE_PROFILE,
        profileData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ UPDATE PROFILE RESPONSE:", res.data);
      return res.data;
    } catch (err) {
      console.log("❌ UPDATE PROFILE ERROR:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Profile update failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    phone: null,

    otpLoading: false,
    otpSent: false,
    otpError: null,

    verifyLoading: false,
    verifySuccess: false,
    verifyError: null,

    profileLoading: false,
    profileSuccess: false,
    profileError: null,

    user: null,
    token: null,
    isAuthenticated: false,
  },

  reducers: {
    resetOtpState: (state) => {
      state.otpLoading = false;
      state.otpSent = false;
      state.otpError = null;
      state.verifyLoading = false;
      state.verifySuccess = false;
      state.verifyError = null;
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

    logout: (state) => {
      state.phone = null;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.otpSent = false;
      state.verifySuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ===== SEND OTP ===== */
      .addCase(sendOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otpSent = true;
        state.phone = action.payload.phone;
        console.log("📞 OTP SENT TO:", state.phone);
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload;
      })

      /* ===== VERIFY OTP ===== */
      .addCase(verifyOtp.pending, (state) => {
        state.verifyLoading = true;
        state.verifyError = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.verifyLoading = false;
        state.verifySuccess = true;
        state.user = action.payload.user || action.payload.customer;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.otpSent = false;
        console.log("🎉 LOGIN SUCCESS");
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifyError = action.payload;
      })

      /* ===== UPDATE PROFILE ===== */
      .addCase(updateProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profileSuccess = true;
        state.user = { ...state.user, ...action.payload.user };
        console.log("👤 PROFILE UPDATED");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      });
  },
});

export const {
  resetOtpState,
  resetProfileState,
  resetVerifyState,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
