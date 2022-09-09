const baseUrl = process.env.API_URL;

const api = {
  SignIn: `${baseUrl}/signin`,
  VerifyOtp: `${baseUrl}/verify/otp`,
  FIRST_LOGIN: `${baseUrl}/first-login`,
  RESET_PW: `${baseUrl}/reset-password`,
  GenerateAccessToken: `${baseUrl}/refresh/token`,
};
export default api;
