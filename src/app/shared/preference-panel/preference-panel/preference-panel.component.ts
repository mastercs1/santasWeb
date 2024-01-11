import { CommonModule } from '@angular/common';
import { Component,  OnInit  } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { PreferenceDetails } from 'src/app/interface/preference-details';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { PreferenceServiceService } from 'src/app/service/preference-service.service';
import { PreferenceOverallDeemStatus } from 'src/app/interface/preference-overall-deem-status';
import { DeemComponentComponent } from '../../deem-component/deem-component.component';
@Component({
  selector: 'app-preference-panel',
  templateUrl: './preference-panel.component.html',
  styleUrls: ['./preference-panel.component.scss'],
  standalone:true,
  imports:[MatCardModule, MatDividerModule, MatListModule, MatTabsModule,CommonModule,MatIconModule,ReactiveFormsModule,MatButtonModule,DeemComponentComponent]
})

/** the clear design is preference id changes than destroy current module then using new preference id then ngonchange . to do this we need preference be a input value instead of value from service. **/
/* the current design is preference id changes get from service , all data has been set in ngOnit , so when cross preference in same tab, it will faster but the design is bad and 
in Oninit take 5 requests instead of 1 request. which one is better in real use , i dont know . need to test it carefully. But personal i like first one . But this implements is 
using second one just for practice. 
*/
export class PreferencePanelComponent implements OnInit{


  preferenceId: string | undefined;
  preferenceDetails: PreferenceDetails | undefined;
  overallDeem:PreferenceOverallDeemStatus| undefined;

  constructor (private preferenceService: PreferenceServiceService){
  }
  
  ngOnInit() {
    this.preferenceService.getPreferenceId().subscribe(preferenceId => {
      this.preferenceId = preferenceId;
   
      if(this.preferenceId){
        this.preferenceService.getPreferenceDetails(this.preferenceId).subscribe({
          next: (response: PreferenceDetails)=>{
            this.preferenceDetails = response;
          }
        })

        this.preferenceService.getOverallDeem(this.preferenceId).subscribe({
          next : (response:PreferenceOverallDeemStatus )=>{
            this.overallDeem = response;
            console.log(this.overallDeem);
          }
         });
        
      }
    });
}

  onChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    if(tab === 'Preference Details'){
      if(this.preferenceId){
        this.preferenceService.getPreferenceDetails(this.preferenceId).subscribe({
          next: (response: PreferenceDetails)=>{
            this.preferenceDetails = response;

          }
        })
      }
      
    }
    if (tab === 'Overall Deemed Status') {
      if(this.preferenceId){
        this.preferenceService.getOverallDeem(this.preferenceId).subscribe({
          next : (response:PreferenceOverallDeemStatus )=>{
            this.overallDeem = response;
            console.log(this.overallDeem);
          }
         });
       }
      }
   
    if (tab === 'Application Details') {
     
    }
    if (tab === 'Application Notes') {
    
      }
    }


    
  }

