import axios from 'axios'

const API_URL = process.env.REACT_APP_BACKEND_API_URL
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/admin/refresh-token`
export const LOGIN_URL = `${API_URL}/admin/login`
export const LOGIN_WITH_NIF_URL = `${API_URL}/organisation_user/nif_auth`
export const REGISTER_URL = `${API_URL}/admin/signup`
export const REQUEST_PASSWORD_URL = `${API_URL}/admin/send-reset-password-email`
export const GET_ORG_BY_NAME_URL = `${API_URL}/organisation/search_nif_org`
export const VERIFY_OTP_URL = `${API_URL}/admin/login_verify_otp`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<any>(LOGIN_URL, {
    email,
    password,
  })
}

// Server should return AuthModel
export function register(
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name,
    last_name,
    password,
    password_confirmation,
  })
}

export function requestPassword(email: string) {
  return axios.post<any>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken() {
  return axios.get<any>(GET_USER_BY_ACCESSTOKEN_URL)
}
export function verifyOtp(id: any, otp: string) {
  return axios.post<any>(VERIFY_OTP_URL, {
    id,
    otp,
  })
}

export function getOrgByName(search: string, page: number, limit: number): Promise<any> {
  return axios.get(GET_ORG_BY_NAME_URL, {
    params: {
      search,
      page,
      limit,
    },
  })
}

export function loginWithNif(org_id: string, code: string) {
  return axios.post(LOGIN_WITH_NIF_URL, {
    org_id,
    code,
  })
}
