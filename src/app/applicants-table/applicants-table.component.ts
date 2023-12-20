import { Component, OnInit,Input,OnChanges, SimpleChanges, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SearchingServiceService } from '../searching/searching-service.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NoteSummaryComponent } from '../shared/dialog/note-summary/note-summary.component';
import { Applicant } from '../interface/applicant';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-applicants-table',
  templateUrl: './applicants-table.component.html',
  styleUrls: ['./applicants-table.component.scss'],
})


export class ApplicantsTableComponent implements OnInit{

  @Input() receivedSearchData: any;
  sub!: Subscription;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Reference','Surname','Givens','Date of Birth','Email Address','Cycle','Status','Action']
  totalItems: number = 0; // inital number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  offset =10;
  pageNumber=1;


  // ngAfterViewInit() {
  //   if(this.dataSource !=null ){
  //     this.dataSource.paginator = this.paginator;
  //     console.warn("length=" + this.paginator.length);
  //   }
    
 
  // }

 constructor(private searchingService :SearchingServiceService,private dialog: MatDialog){}

  ngOnInit(): void {
    console.log('get from parent' + this.receivedSearchData);
  }

  
async fetch() :Promise<void>{
  const dobValue = this.receivedSearchData?.dob|| '';
  const surnameValue = this.receivedSearchData?.surname|| '';
  const givensValue = this.receivedSearchData?.givens ||'';
  const referenceValue = this.receivedSearchData?.reference||'';
  const courseCodeValue = this.receivedSearchData?.courseCode||'';
  const cycleValue = this.receivedSearchData?.cycle||'';
 // this.dataSource.data=[];
 let localData = [];
  this.sub= this.searchingService.getApplicants(surnameValue,givensValue,referenceValue,dobValue,courseCodeValue,cycleValue,this.offset,this.pageNumber).subscribe({
     next:response => {
       console.log('data got from searching' + JSON.stringify(response))
       localData = response.applicants; // Assign to the local variable
    
       this.fetchData(response.totalApplicants);
       console.warn(response.totalApplicants);
      
       console.log(localData);
       this.dataSource.data=localData;
       console.log(this.dataSource.data);
     
     },
     complete:()=>{
       console.log("complete");
     },
     error: err => {
       console.error('Error occurred:', err);
       // Handle error scenario
     }
  })
}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['receivedSearchData'] && changes['receivedSearchData'].currentValue) {
      this.fetch();
    }
  }

    // Fetch your data and set the totalItems when you have the count
    fetchData(totalNumber:number) {
      // Assume you get the total count of items from an API call or somewhere
      this.totalItems = totalNumber; // Replace with your actual total count
    }

  viewNotes(applicant:Applicant){
    const dialogRef = this.dialog.open(NoteSummaryComponent, {
      width: '500px',
      data: {surname: applicant.surname, givens: applicant.givens , applicantId:applicant.applicantId} // Pass applicant data to ViewNotesComponent if needed
    });
  }

  // notifyParent(currentNoteNumber:number,applicantId:number){
  //   const updatedData = this.dataSource.data.map((applicant: any)=>{
  //    if(applicantId===applicant.applicantId){
  //      applicant.noteNumber=currentNoteNumber; // update the note number and this is only number add not call service , when cilck on givens it will call note service to get notes
  //    }
  //   });
  //   console.log("get note numbner in table : " + currentNoteNumber);
  // }


  notifyParent(currentNoteNumber: number, applicantId: number): void {
    this.dataSource.data = this.dataSource.data.map((applicant:any) => {
      if (applicant.applicantId === applicantId) {
        return { ...applicant, noteNumber: currentNoteNumber };
      }
      return applicant;
    });
    console.log(`Got note number in table: ${currentNoteNumber}`);
  }


  // Hook into page change event to handle pagination logic
  onPageChange(event: any) {
    this.pageNumber = event.pageIndex + 1; // Increment by 1 for next page
    this.fetch();
  }


}
