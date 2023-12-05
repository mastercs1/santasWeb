import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
MatInputModule
@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    MatInputModule
    
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }
