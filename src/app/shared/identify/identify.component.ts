import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { Address } from 'src/app/interface/address';
import { identification } from 'src/app/interface/identification';
import { SearchingServiceService } from 'src/app/searching/searching-service.service';

@Component({
  selector: 'app-identify',
  templateUrl: './identify.component.html',
  styleUrls: ['./identify.component.scss'],
  imports: [MatCardModule, MatDividerModule, MatListModule, MatTabsModule],
  standalone: true,
})
export class IdentifyComponent {
  applicantRef: string | null = null;
  localData: string | undefined;
  identification: identification = {
    applicantEligibility: '',
    applicantEligibilityHowDerived: '',
    applicationStaus: '',
    citizenship: '',
    cycle: '',
    dataOfBirth: '',
    emailAddress: '',
    mobile: '',
    name: '',
    personStatus: '',
    reference: '',
    workPhone: '',
  };
   postAddress:Address | undefined;
   permanentAddress:Address| undefined;

  
  constructor(private service: SearchingServiceService) {}

  ngOnInit() {
    this.applicantRef = localStorage.getItem('applicantRef');
    if (this.applicantRef) {
      this.service.getIdentification(this.applicantRef).subscribe({
        next: (response: any) => {
          if (response) {
            this.identification = response;
          }
        },
      });
    }
  }
  onChange(event:MatTabChangeEvent){
    const tab = event.tab.textLabel;
    if(tab==="Contact Details"){
      this.applicantRef = localStorage.getItem('applicantRef');
      if (this.applicantRef) {
        this.service.getAddress(this.applicantRef).subscribe({
          next: (response: Address[]) => {
            if (response) {
              response.map((add: Address)=>{
               if(add.addressType==='Postal'){
                  this.postAddress=add;
               }
               if(add.addressType==='Permanent'){
                  this.permanentAddress=add;
               }
              });
            }
          },
        });
      }
    }
    if(tab==="Identification Details"){
      console.log("Identification Details clicked");
    }
  }
}
