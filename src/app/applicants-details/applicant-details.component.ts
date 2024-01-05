import { Component, Injector, Input, OnInit } from '@angular/core';
import { IdentifyComponent } from '../shared/identify/identify.component';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent implements OnInit{
  
  showFiller = false;
  message='';
  selectedComponent:any;
  
  applicantRef:any;
  customInjector: any;

  constructor (private route: ActivatedRoute,private injector: Injector){
    this.route.params.subscribe(params => {
      this.applicantRef = params['id']; // 'id' should match the parameter name in the route
      localStorage.setItem('applicantRef', this.applicantRef);
    });
  }
  ngOnInit(): void {
    
  }
  
  emitPersonalDetails(componentName: string) {
    // Logic to set selectedComponent based on componentName
    switch (componentName.trim()) {
        case 'Application Details':
            this.selectedComponent =IdentifyComponent ;
        
            break;
        // Add other cases for different components
        default:
            this.selectedComponent = null; // Set to null if no matching component found
            break;
    }
}
 
panel1Opened = false;

togglePanel1() {
  this.panel1Opened = !this.panel1Opened;
}


}
