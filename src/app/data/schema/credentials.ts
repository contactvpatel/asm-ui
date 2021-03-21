export interface Credentials {
  EmailVerified: boolean;
  PhoneVerified: boolean;
  StatusCode: number;
  authenticationInfo?: string;
  errorMessage?: any;
  token?: string;
}
