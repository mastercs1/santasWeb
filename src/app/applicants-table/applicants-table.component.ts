import { Component, OnInit,Input,OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { SearchingServiceService } from '../searching/searching-service.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NoteSummaryComponent } from '../shared/dialog/note-summary/note-summary.component';
import { Applicant } from '../interface/applicant';


@Component({
  selector: 'app-applicants-table',
  templateUrl: './applicants-table.component.html',
  styleUrls: ['./applicants-table.component.scss'],
})


export class ApplicantsTableComponent implements OnInit{

  @Input() receivedSearchData: any;
  sub!: Subscription;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Reference','Surname','Givens','Dob','Course Code','Cycle','Action']


 constructor(private searchingService :SearchingServiceService,private dialog: MatDialog){}

  ngOnInit(): void {
    console.log('get from parent' + this.receivedSearchData);
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['receivedSearchData'] && changes['receivedSearchData'].currentValue) {
       const dobValue = this.receivedSearchData?.dob|| '';
       const surnameValue = this.receivedSearchData?.surname|| '';
       const givensValue = this.receivedSearchData?.givens ||'';
       const referenceValue = this.receivedSearchData?.reference||'';
       const courseCodeValue = this.receivedSearchData?.courseCode||'';
       const cycleValue = this.receivedSearchData?.cycle||'';
      // this.dataSource.data=[];
      let localData = [];
       this.sub= this.searchingService.getApplicants(surnameValue,givensValue,referenceValue,dobValue,courseCodeValue,cycleValue).subscribe({
          next:response => {
            console.log('data got from searching' + JSON.stringify(response))
            localData = response.applicants; // Assign to the local variable
            console.log(localData);
            this.dataSource.data=response.applicants;
            console.log(this.dataSource.data);
          
          },
          error: err => {
            console.error('Error occurred:', err);
            // Handle error scenario
          }
       })
       
    }
  }
  viewNotes(applicant:Applicant){
    const dialogRef = this.dialog.open(NoteSummaryComponent, {
      width: '500px',
      data: {surname: applicant.surname, givens: applicant.givens , applicantId:applicant.applicantId} // Pass applicant data to ViewNotesComponent if needed
    });
  }

  notifyParent(currentNoteNumber:number,applicantId:number){
    const updatedData = this.dataSource.data.map((applicant: any)=>{
     if(applicantId===applicant.applicantId){
       applicant.noteNumber=currentNoteNumber; // update the note number and this is only number add not call service , when cilck on givens it will call note service to get notes
     }
    });
    console.log("get note numbner in table : " + currentNoteNumber);
  }
}
