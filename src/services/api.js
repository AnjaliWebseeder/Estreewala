export const BASE_URL = "https://api.estreewalla.com/api/v1"

// Customer Auth APIs
// export const CUSTOMER_REGISTER = `${BASE_URL}/customer-auth/register`
// export const CUSTOMER_REGISTER_SEND_OTP = `${BASE_URL}/customer-auth/register-send-otp`
// export const CUSTOMER_REGISTER_VERIFY_OTP = `${BASE_URL}/customer-auth/register-verify-otp`

export const SEND_OTP = `${BASE_URL}/customer-auth/phone/send-otp`
export const VERIFY_OTP = `${BASE_URL}/customer-auth/phone/verify-otp`
export const UPDATE_PROFILE = `${BASE_URL}/customer-auth/update-profile`

// Customer Address APIs
export const GET_ADDRESSES = `${BASE_URL}/customer-auth/addresses`
export const ADD_ADDRESS = `${BASE_URL}/customer-auth/addresses`
export const UPDATE_ADDRESS = (id) => `${BASE_URL}/customer-auth/addresses/${id}`
export const DELETE_ADDRESS = (id) => `${BASE_URL}/customer-auth/addresses/${id}`
export const SET_DEFAULT_ADDRESS = (id) =>
  `${BASE_URL}/customer-auth/addresses/${id}/set-default`;

// Notifications APIs
export const GET_CUSTOMER_NOTIFICATIONS =
  `${BASE_URL}/customers/my-notifications`;

export const MARK_NOTIFICATION_READ = (id) =>
  `${BASE_URL}/customers/notifications/${id}/read`;

export const MARK_ALL_NOTIFICATION_READ = `${BASE_URL}/customers/notifications/mark-all-read`;

export const ORDER_DETAILS=(id)=>`${BASE_URL}/customers/orders/${id}/summary`;

export const GET_NEARBY_VENDORS = `${BASE_URL}/customers/nearby-vendors`;
export const GET_NEARBY_VENDORS_FILTER_API = `${BASE_URL}/customers/filter-by-latlng`;
export const GET_CUSTOMERDETAILS = `${BASE_URL}/customers/details`

export const SEARCH_VENDORS_API =
  `${BASE_URL}/customers/search-by-latlng`;

export const UPDATE_FCM_API = `${BASE_URL}/customers/update-fcm-token`

export const DELETE_ACCOUNT_API = `${BASE_URL}/customer-auth/delete-account`
