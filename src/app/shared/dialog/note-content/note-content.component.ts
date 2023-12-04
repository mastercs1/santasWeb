import { Component, Inject } from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { DialogData } from 'src/app/interface/DialogData';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog'; 

@Component({
  selector: 'app-note-content',
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.scss'],
  standalone: true,
  imports: [FormsModule, DialogModule,MatFormFieldModule,MatDialogModule],
})
export class NoteContentComponent {

  constructor(
    public dialogRef: DialogRef<NoteContentComponent>,
    @Inject(DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
