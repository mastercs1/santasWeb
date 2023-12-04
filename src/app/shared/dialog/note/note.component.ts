import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { NoteContentComponent } from '../note-content/note-content.component';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  standalone: true,
  imports:[MatButtonModule,FormsModule]
})


export class NoteComponent implements OnInit{
  ngOnInit(): void {
   
  }

  @Input()
  applicant:any
  constructor (public dialog: Dialog){}

  openDialog(){
    const dialogRef = this.dialog.open<string>(NoteContentComponent, {
      width: '250px',
      data: {surname: this.applicant.surname, givens: this.applicant.givens},
    });


    console.log("applicant=" + this.applicant.surname + this.applicant.givens);
  }

  
}
