import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { DialogData } from 'src/app/interface/DialogData';
import { SearchingServiceService } from 'src/app/searching/searching-service.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NoteResponse } from 'src/app/interface/noteResponse';
import { Note } from 'src/app/interface/note';
export interface Card {
  whoCreated:string
  subtitle: string;
  text: string;
}

@Component({
  selector: 'app-note-summary',
  templateUrl: './note-summary.component.html',
  styleUrls: ['./note-summary.component.scss'],
  standalone:true,
  imports: [CommonModule,MatCardModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatPaginatorModule]
})
export class NoteSummaryComponent {
  notes!: NoteResponse[];
  DATA!: Card[];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  
  obs?: Observable<any>;
  dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>(this.DATA);

  constructor(private changeDetectorRef: ChangeDetectorRef,
              @Inject(DIALOG_DATA) public data: DialogData,
              private  service:SearchingServiceService) {
           
              }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
    }
    
    this.service.getNotes(this.data.applicantId).subscribe({
      next: (notes: any[]) => {
       // let count = 1; // Initialize count variable
        const cards: Card[] = notes.map((note: any) => {
          const card: Card = {
            whoCreated:note.whoCreated,
            subtitle: note.whenCreated,
            text: note.note.toString()
            
          };
          return card;
        });

        this.DATA=cards;
        this.dataSource.data = cards;
        this.obs = this.dataSource.connect();
      },
      error: (error) => {
        // Handle error if needed
      },
    });
  
   
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
