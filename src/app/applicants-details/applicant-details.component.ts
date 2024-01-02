import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent implements OnInit{
  
  showFiller = false;
  applicantName="Yuxin Tong"
  message='';

  ngOnInit(): void {
    
  }
  emitPersonalDetails(_message:string){
    console.log(_message);

    this.message=_message;
  }
}
