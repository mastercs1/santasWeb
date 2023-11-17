import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchingComponentComponent } from './searching-component.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {TimepickerComponent } from '../shared/timepicker/timepicker.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {SelectComponent} from '../shared/select/select.component'
@NgModule({
  declarations: [
    SearchingComponentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    TimepickerComponent,
    SelectComponent,
    RouterModule.forChild([
      {path:'',component:SearchingComponentComponent}
    ])
  ],
  exports:[SearchingComponentComponent]
})
export class SearchingModule { }
