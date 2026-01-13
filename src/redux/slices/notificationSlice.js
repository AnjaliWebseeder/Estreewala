import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosConfig';
import {
  UPDATE_FCM_API,
  GET_CUSTOMER_NOTIFICATIONS,
  MARK_NOTIFICATION_READ,
} from '../../services/api';

const getAuthToken = (getState) => {
  const token = getState()?.auth?.token;
  if (!token) throw new Error('No token found. Please log in again.');
  return token;
};

export const updateFcmToken = createAsyncThunk(
  'notification/updateFcmToken',
  async (fcmToken, { getState, rejectWithValue }) => {
    try {
      const token = getAuthToken(getState);

      const res = await axiosInstance.post(
        UPDATE_FCM_API,
        { fcmToken },
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Failed to update FCM token'
      );
    }
  }
);


export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getAuthToken(getState);

      const res = await axiosInstance.get(
        GET_CUSTOMER_NOTIFICATIONS,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("notification res.data",res.data);

      return res.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        'Failed to fetch notifications'
      );
    }
  }
);

/* --------------------------------------------------
 🔔 MARK NOTIFICATION AS READ
-------------------------------------------------- */
export const markNotificationRead = createAsyncThunk(
  'notification/markRead',
  async (notificationId, { getState, rejectWithValue }) => {
    try {
      const token = getAuthToken(getState);

      await axiosInstance.patch(
        MARK_NOTIFICATION_READ(notificationId),
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return notificationId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        'Failed to mark notification read'
      );
    }
  }
);

/* --------------------------------------------------
 🧠 SLICE
-------------------------------------------------- */
const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    list: [],
    unreadCount: 0,
    loading: false,
    error: null,
    fcmUpdated: false,
  },

  reducers: {
    resetNotifications: (state) => {
      state.list = [];
      state.unreadCount = 0;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------- FETCH ---------- */
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;

        const notifications = Array.isArray(action.payload)
          ? action.payload
          : action.payload.notifications || [];

        state.list = notifications;

        state.unreadCount = notifications.filter(
          n => !n.isRead
        ).length;

        console.log(
          '🔔 unreadCount calculated:',
          state.unreadCount
        );
      })

      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- MARK READ ---------- */
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const id = action.payload;
        const index = state.list.findIndex(n => n._id === id);

        if (index !== -1 && !state.list[index].isRead) {
          state.list[index].isRead = true;
          state.unreadCount -= 1;
        }
      })

      /* ---------- FCM ---------- */
      .addCase(updateFcmToken.fulfilled, (state) => {
        state.fcmUpdated = true;
      });
  },
});

export const { resetNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
