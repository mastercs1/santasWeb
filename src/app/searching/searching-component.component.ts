import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-searching-component',
  templateUrl: './searching-component.component.html',
  styleUrls: ['./searching-component.component.scss']
})
export class SearchingComponentComponent {
  selectedTime: Date | null = null;

  form: FormGroup = new FormGroup({
  selectedTime: new FormControl(null)
  });
  
  handleDateSelection(pickedDate:Date) {
    console.log('Selected date in parent component:', pickedDate);
    this.selectedTime = pickedDate;
    this.form.patchValue({selectedTime: this.selectedTime});
    console.log("from fomr group =" + this.form.get("selectedTime")?.value)
  }
}
