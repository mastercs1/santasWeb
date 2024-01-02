import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})




export class NavbarComponent implements OnInit{
  constructor(private authService: AuthService) {}
  isLoggedIn!: boolean;
  ngOnInit() {
    //force 
    this.isLoggedIn= true;
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if(isLoggedIn){
      this.isLoggedIn = isLoggedIn;
    }
      console.log("isLoggedIn =" + isLoggedIn);
    });
  }

}
