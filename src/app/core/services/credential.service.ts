import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteReusableStrategy } from '../route-reusable-strategy';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: any;
  authenticationInfo: any;
}

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
  domain: string;
  constructor() {
    this.domain = document.domain + '_';
    const savedCredentials =
      sessionStorage.getItem(this.domain + credentialsKey) ||
      localStorage.getItem(this.domain + credentialsKey);
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
      sessionStorage.getItem(this.domain + credentialsKey) ||
      localStorage.getItem(this.domain + credentialsKey);
    if (savedCredentials) {
      const credentialValue = JSON.parse(savedCredentials);
      return !!credentialValue;
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
      storage.setItem(
        this.domain + credentialsKey,
        JSON.stringify(credentials)
      );
    } else {
      sessionStorage.removeItem(this.domain + credentialsKey);
      localStorage.removeItem(this.domain + credentialsKey);
    }
  }

  removeCredentials() {
    sessionStorage.removeItem(this.domain + credentialsKey);
    localStorage.removeItem(this.domain + credentialsKey);
  }
}
