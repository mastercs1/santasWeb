import { Component, Injector, Input, OnInit } from '@angular/core';
import { IdentifyComponent } from '../shared/identify/identify.component';
import { ActivatedRoute } from '@angular/router';
import { SearchingServiceService } from '../searching/searching-service.service';
import { Preference } from '../interface/preference';
import { PreferencePanelComponent } from '../shared/preference-panel/preference-panel/preference-panel.component';
import { PreferenceServiceService } from '../service/preference-service.service';




@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent implements OnInit{
  
  showFiller = false;
  message='';
  selectedComponent:any;
  preferencesList: Preference[] = []; 
  applicantId:any;
  customInjector: any;
  username:any
  selectedPreferenceId: string | null = null;
  panel1Opened = false;


  constructor (private route: ActivatedRoute,private injector: Injector,private service:SearchingServiceService,private preferenceService: PreferenceServiceService){
    this.route.params.subscribe(params => {
      this.applicantId = params['id']; // 'id' should match the parameter name in the route
      localStorage.setItem('applicantId', this.applicantId); // set applicant is in local and refresh every time get new applicantid.
    });
  
  }
  ngOnInit(): void {

    let user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.username = user.username; 

    const applicantId = localStorage.getItem('applicantId');
    if(applicantId){
      this.service.getPreference(applicantId).subscribe({
      next :(response:Preference[])  =>{
        console.log(response);
        this.preferencesList = response;
      }      
      })
    }
  }
  
  emitPersonalDetails(componentName: string) {
    // Logic to set selectedComponent based on componentName
    switch (componentName.trim()) {// consider using preference | 1 switch for first part and using second part pass to preference component.
        case 'Application Details':
            this.selectedComponent =IdentifyComponent ;
            //this.panel1Opened =false;
            break;
        // Add other cases for different components
      // Add other cases for different components
      
        default:
            this.selectedComponent = null; // Set to null if no matching component found
            break;
    }
}

emitPreferenceDetails(preferenceId : string){
  //console.log(preferenceId );
  if( this.preferencesList && this.preferencesList.length>0)
  this.selectedComponent =PreferencePanelComponent ;
  this.selectedPreferenceId=preferenceId;
  this.preferenceService.setPreferenceId(preferenceId);
}




togglePanel1() {
  this.panel1Opened = !this.panel1Opened;
}


}
