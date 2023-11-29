import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchingComponentComponent } from './searching-component.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {TimepickerComponent } from '../shared/timepicker/timepicker.component';
import {SelectComponent } from '../shared/select/select.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    SearchingComponentComponent,
  ],
  imports: [
    CommonModule,
    SelectComponent,
    ReactiveFormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    TimepickerComponent,
    RouterModule.forChild([
      {path:'',component:SearchingComponentComponent}
    ])
  ],
  exports:[
    SearchingComponentComponent,
  ],
  providers: [DatePipe]
})
export class SearchingModule { }
