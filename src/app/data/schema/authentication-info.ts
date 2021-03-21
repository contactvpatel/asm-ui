export interface AuthenticationInfo {
  EmailVerified: boolean;
  PersonIdentifer?: string;
  PhoneVerified: boolean;
  RedirectUri?: string;
  ReferenceIdentifer?: string;
  Roles?: string;
}
