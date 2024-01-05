import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantDetailsComponent } from './applicant-details.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'; 
import {MatTreeModule} from '@angular/material/tree'; 
import { MatExpansionModule } from '@angular/material/expansion';

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
    MatTreeModule,
    MatExpansionModule,
    RouterModule.forChild([
      {path:'',component:ApplicantDetailsComponent}
    ])
  ],
  exports:[
    ApplicantDetailsComponent
  ]
})
export class ApplicantDetailsModule { }
