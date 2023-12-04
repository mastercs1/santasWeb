import { Component, OnInit,Input,OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { SearchingServiceService } from '../searching/searching-service.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import {NoteComponent} from '../shared/dialog/note/note.component'

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


 constructor(private searchingService :SearchingServiceService){}

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
}
