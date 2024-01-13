import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeemComponentComponent } from '../shared/overall-deem-component/overall-deem-component.component';
import { STRING_TYPE } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DeemDialogServiceService {

  constructor(private dialog: MatDialog) { }

  openStepperDialog(id:string): void {
    this.dialog.open(DeemComponentComponent,{
      width: '80%', 
      height: '80%',
      data: {overallDeemId: id }
    });
  }
}
