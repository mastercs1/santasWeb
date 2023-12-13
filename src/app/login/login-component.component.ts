import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit{
  errorMessage = '';
  
  constructor(private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.setLoginStatus(false);
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  
  submit() {
    if (this.form.valid) {
      const usernameControl = this.form.get('username');
      const passwordControl = this.form.get('password');
   
      if (usernameControl && passwordControl) {
        const usernameValue = usernameControl.value;
        const passwordValue = passwordControl.value;
      if(usernameValue==='yuxin tong' && passwordValue==='yuxintong'){
      
        this.authService.setLoginStatus(true);
        localStorage.setItem('currentUser', JSON.stringify({
          username: "yuxin tong",
          password:"yuxintong"
        }));
        this.router.navigate(['/searching']);
      }
      else{
        this.errorMessage="Incorrect username or password"
      }
    }

    }
  }

  @Output() submitEM = new EventEmitter();
}
