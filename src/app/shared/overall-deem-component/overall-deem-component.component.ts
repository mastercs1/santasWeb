import {Component, Inject, Input} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select'; 
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deem-component',
  templateUrl: './overall-deem-component.component.html',
  styleUrls: ['./overall-deem-component.component.scss'],
  standalone:true,
  imports:[  MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule 
   ]
    
})
export class DeemComponentComponent {
  admission='';
  deemValue='';
  
 
  isEditable = false;
  firstFormGroup:any;
  secondFormGroup:any;
  thirdFormGroup:any;
  overallDeemId:any;
  
  constructor(private _formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.overallDeemId = data.overallDeemId;

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      
    })
  
  }
  
  getThirdCtrlValue(): string {
    return this.thirdFormGroup.get('thirdCtrl').value;
  }
  submit(){
    console.log("overallDeemId= " + this.overallDeemId.toString());
    console.log("admission= "+ this.admission);
    console.log("deemValue= "+ this.deemValue);
    console.log("wht deemed= "+ this.getThirdCtrlValue());
  }
}
