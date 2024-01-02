import { Component, OnInit } from '@angular/core';
import { IdentifyComponent } from '../shared/identify/identify.component';



@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent implements OnInit{
  
  showFiller = false;
  applicantName="Yuxin Tong"
  message='';
  selectedComponent: any;

  ngOnInit(): void {
    
  }

  emitPersonalDetails(componentName: string) {
    // Logic to set selectedComponent based on componentName
    switch (componentName.trim()) {
        case 'Identification Details':
            this.selectedComponent =IdentifyComponent ;
            break;
        // Add other cases for different components
        default:
            this.selectedComponent = null; // Set to null if no matching component found
            break;
    }
}
}
