import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponentComponent } from './login-component.component'
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MATE_MODULE :any[] =[MatFormFieldModule,MatCardModule]
const ANGULAR_MODULE : any[] = [ReactiveFormsModule,RouterModule,HttpClientModule,BrowserAnimationsModule];

@NgModule({
  declarations: [LoginComponentComponent],
  imports: [
    CommonModule,
    MATE_MODULE,
    ANGULAR_MODULE
  ],
  exports :[LoginComponentComponent]
})

export class LoginModuleModule { }
