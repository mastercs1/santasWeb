import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantDetailsComponent } from './applicant-details.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'; 


@NgModule({
  declarations: [
    ApplicantDetailsComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule.forChild([
      {path:'',component:ApplicantDetailsComponent}
    ])
  ],
  exports:[
    ApplicantDetailsComponent
  ]
})
export class ApplicantDetailsModule { }
