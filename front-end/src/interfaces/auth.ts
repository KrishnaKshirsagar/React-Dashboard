export interface LoginCredentials {
  mobile_number: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  data: {
    token: string;
    user_id: number;
    mobile_number: string;
    role: string;
  };
}

export interface ResetPasswordRequest {
  mobile_number: string;
  otp: string;
  password: string;
  confirm_password?: string;
}

export interface messageResponse {
  message: string;
}
