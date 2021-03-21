import { Injectable } from '@angular/core';
import { AuthenticationInfo } from '@app/data/schema/authentication-info';
import { Credentials } from '@app/data/schema/credentials';
import { environment } from '@env/environment';

const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private credentialValue: Credentials | null = null;
  key: string;
  constructor() {
    this.key =
      document.domain +
      '_' +
      environment.applicationName +
      '_' +
      credentialsKey;
    const savedCredentials =
      sessionStorage.getItem(this.key) || localStorage.getItem(this.key);
    if (savedCredentials) {
      this.credentialValue = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    const savedCredentials =
      sessionStorage.getItem(this.key) || localStorage.getItem(this.key);
    if (savedCredentials) {
      this.credentialValue = JSON.parse(savedCredentials);
      return !!this.credentialValue;
    }
    false;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this.credentialValue;
  }

  /**
   * Gets the auth info.
   * @return The user credentials or null if the auth info not found.
   */
  get authinfo(): AuthenticationInfo | null {
    let authenticationInfo: AuthenticationInfo = JSON.parse(
      this.credentialValue.authenticationInfo
    );
    return authenticationInfo;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this.credentialValue = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(this.key, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(this.key);
      localStorage.removeItem(this.key);
    }
  }

  removeCredentials() {
    sessionStorage.removeItem(this.key);
    localStorage.removeItem(this.key);
    localStorage.removeItem('asm_authenticationInfo');
  }
}
