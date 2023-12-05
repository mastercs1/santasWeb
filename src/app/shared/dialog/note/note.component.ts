import { Component, Input, OnInit ,ViewChild, ElementRef, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { NoteContentComponent } from '../note-content/note-content.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  standalone: true,
  imports:[MatButtonModule,FormsModule,MatBadgeModule,CommonModule]
})



export class NoteComponent implements OnInit {

  ngOnInit(): void {
   
  }
  
  @Output() currentNoteNumber: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  applicant:any
  constructor (public dialog: MatDialog){}

  openDialog(){
    const dialogRef = this.dialog.open<NoteContentComponent,DialogData>(NoteContentComponent, {
      width: '500px',
      data: {surname: this.applicant.surname, givens: this.applicant.givens,applicantId:this.applicant.applicantId,noteNumber :this.applicant.noteNumber},
    });
    
    dialogRef.componentInstance?.noteSaved.subscribe((data: number) => {
      this.currentNoteNumber.emit(data);
      console.log('Received data from NoteContentComponent:', data);
      // Handle the emitted event data here, if needed
      // For example, update your applicant data or perform other actions
    });
  }

  notifyParent(noteNumber:number){
    console.log(noteNumber);
  }
  
  

}
