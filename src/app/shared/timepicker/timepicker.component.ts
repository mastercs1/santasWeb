import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule,ReactiveFormsModule],
})
export class TimepickerComponent {
  
  @Input()
  date_label='';

  @Input()
  control = new UntypedFormControl();

  @Output() dateSelected = new EventEmitter<Date>();
  
  selectedDate: Date | null = null;
  dateInput(event: MatDatepickerInputEvent<Date>) {
    console.log("get date from picker");
    
      const selectedDate = event.value;
   
      if (selectedDate) {
        this.dateSelected.emit(selectedDate);
      }
    }
  
}
