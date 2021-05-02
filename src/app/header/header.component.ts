import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isAuthenticated = false;
  
  /**
   * 
   * @param authService 
   * @param router 
   */
  constructor(private authService: AuthService,private router: Router,) { 
    this.authService.authenticationEventObservable.subscribe((event) => {
      console.log('Nav Component recieved auth event ' + event);
      this.isAuthenticated = event;
      this.ngOnInit();
    });
  }

  public authenticated(): Observable<boolean> {
    return this.authService.authenticationEventObservable.asObservable();
  }
  
  /**
   *
   */
  ngOnInit() { 
    this.authService.isAuthenticated();
  }
  

  /**
   *
   */
  public login() {
    console.log('Navbar login()');
    this.authService.login();
  }

  /**
   *
   */
  public logout() {
    console.log('Navbar logout()');
    this.authService.logout();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.router.navigateByUrl('landing');
  }

}
