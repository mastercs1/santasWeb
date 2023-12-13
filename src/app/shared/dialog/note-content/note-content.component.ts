import { Component, ErrorHandler, EventEmitter, Inject, Output } from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { DialogData } from 'src/app/interface/DialogData';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog'; 
import { MatInputModule } from '@angular/material/input';
import { SearchingServiceService } from 'src/app/searching/searching-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-note-content',
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.scss'],
  standalone: true,
  imports: [FormsModule, DialogModule,MatFormFieldModule,MatDialogModule,MatInputModule],
})
export class NoteContentComponent {


@Output() noteSaved: EventEmitter<number> = new EventEmitter<number>();

  textareaValue: string = ''; 
  constructor(
    public dialogRef: DialogRef<NoteContentComponent>,
    private service: SearchingServiceService,
    @Inject(DIALOG_DATA) public data: DialogData) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveAndCloseDialog(): void {
    console.log('Textarea value:', this.textareaValue);
    let username = ''; 
    const currentUserData = localStorage.getItem('currentUser');
    
    if (currentUserData !== null) {
      const currentUser = JSON.parse(currentUserData);
      username = currentUser.username;
    }

    this.service.addNote(this.data.applicantId,this.textareaValue,username).subscribe({
      next:()=>{
        this.noteSaved.emit(this.data.noteNumber+1);
      },
      error:(error)=>{
        console.error('An error occurred:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Response body:', error.error);
        }
      
        this.handlerError()
      }
    })
    this.dialogRef.close();
  }
  
  handlerError(){
    console.log("error");
  }
}