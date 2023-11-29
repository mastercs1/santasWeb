import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup,ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SearchingServiceService } from './searching-service.service';
import { NameDescription } from '../interface/nameDescription';
import { DatePipe } from '@angular/common';
import {FilterValidators} from '../validators/FilterValidators'

@Component({
  selector: 'app-searching-component',
  templateUrl: './searching-component.component.html',
  styleUrls: ['./searching-component.component.scss']
})
export class SearchingComponentComponent implements OnInit {
  form: FormGroup;

  constructor(private service: SearchingServiceService, private datePipe:DatePipe) { 
    this.form= new FormGroup({
      dob: new FormControl(''),
      surname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
      givens: new FormControl(''),
      reference: new FormControl(''),
      courseCode: new FormControl(''),
      cycle: new FormControl(''),
      },
    {validators:FilterValidators.atLeastOneFilter});
  }
  cycles!: NameDescription[];

  @Output() searchData = new EventEmitter<any>();


  ngOnInit(): void {
    this.service.getCycles().subscribe({
      next: (cycles: any[]) => {
        const nameDescriptions: NameDescription[] = cycles.map((cycle: any) => {
          const nameDescription: NameDescription = {
            name: cycle.cycleCode,
            description: cycle.cycleName,
            extra: cycle.cycleId
          };
          return nameDescription;
        });

        this.cycles = nameDescriptions;
      },
      error: (error) => {
        // Handle error if needed
      },
    });
  }


  color = "warn";



  handleDateSelection(pickedDate: Date) {
    console.log('Selected date in parent component:', pickedDate);
    const formattedDate = this.datePipe.transform(pickedDate, 'yyyy-MM-dd');
    this.form.patchValue({ dob:  formattedDate||'' });
    console.log("from fomr group =" + this.form.get("selectedTime")?.value)
  }
  
  emitFormData(){
    if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData); // Log the form data to the console for debugging purposes
      this.searchData.emit(formData); // Emit the form data when the button is clicked
    } else {
      // Handle if the form is invalid
      console.log('Form is invalid.');
    }
  }
  

}
