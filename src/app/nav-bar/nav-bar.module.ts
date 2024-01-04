import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list'
import {MatIconModule} from '@angular/material/icon'; 
import { IdentifyComponent } from '../shared/identify/identify.component';
MatInputModule
@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    IdentifyComponent
    
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }
