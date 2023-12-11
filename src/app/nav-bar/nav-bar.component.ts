import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})




export class NavbarComponent implements OnInit{
  constructor(private authService: AuthService) {}
  isLoggedIn=false;
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      console.log("isLoggedIn =" + isLoggedIn);
    });
  }

}
