import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponentComponent } from './login-component.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
@NgModule({
  declarations: [LoginComponentComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: LoginComponentComponent}
    ]),
  ],
  exports: [LoginComponentComponent]
})
export class LoginModule { }
