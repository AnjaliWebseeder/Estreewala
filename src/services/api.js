export const BASE_URL = "https://api.estreewalla.com/api/v1"

// Customer Auth APIs
export const CUSTOMER_REGISTER = `${BASE_URL}/customer-auth/register`
export const SEND_OTP = `${BASE_URL}/customer-auth/send-otp`
export const VERIFY_OTP = `${BASE_URL}/customer-auth/verify-otp`
export const UPDATE_PROFILE = `${BASE_URL}/customer-auth/update-profile`

// Customer Address APIs
export const GET_ADDRESSES = `${BASE_URL}/customer-auth/addresses`
export const ADD_ADDRESS = `${BASE_URL}/customer-auth/addresses`
export const UPDATE_ADDRESS = (id) => `${BASE_URL}/customer-auth/addresses/${id}`
export const DELETE_ADDRESS = (id) => `${BASE_URL}/customer-auth/addresses/${id}`

export const GET_NEARBY_VENDORS = `${BASE_URL}/customers/nearby-vendors`;

export const GET_CUSTOMERDETAILS = `${BASE_URL}/customers/details`
