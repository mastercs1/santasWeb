import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantDetailsComponent } from './applicant-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ApplicantDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:ApplicantDetailsComponent}
    ])
  ],
  exports:[
    ApplicantDetailsComponent
  ]
})
export class ApplicantDetailsModule { }
