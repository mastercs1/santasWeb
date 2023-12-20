import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
 
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  

  { 
    path: 'login',  loadChildren: () =>import('./login/login.module').then((m) => m.LoginModule), 
  },


  { 
    path: 'searching',  loadChildren: () =>import('./searching/searching.module').then((m) => m.SearchingModule), 
  },
  { 
    path: 'applicants/:id',  loadChildren: () =>import('./applicants-details/applicant-details.module').then((m) => m.ApplicantDetailsModule), 
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
