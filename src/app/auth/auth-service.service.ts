import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';
import { AuthCodeFlowConfig } from './auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticationEventObservable: Subject<boolean> = new Subject<boolean>();
  /**
   *
   * @param router
   * @param oauthService
   */
  constructor(private router: Router, private oauthService: OAuthService) {
    this.oauthService.configure(AuthCodeFlowConfig);
  }

  /**
   *
   */
  public login() {
    console.log('Auth Service login()');
    this.oauthService
      .loadDiscoveryDocumentAndLogin()
      .then((result: boolean) => {
        console.log('result is ' + result);
        this.authenticationEventObservable.next(result);
        //this.router.navigateByUrl('home');
      })
      .catch((error) => {
        this.logout();
      });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();
  }

  /**
   *
   */
  public logout() {
    console.log('Auth Service logoff()');
    this.oauthService.logOut();
    //this.router.navigateByUrl('landing');
  }

  /**
   *
   */
  public isAuthenticated(): boolean {
    if (
      this.oauthService.hasValidAccessToken &&
      this.oauthService.hasValidIdToken()
    ) {
      return true;
    } else {
      return false;
    }
  }
}
