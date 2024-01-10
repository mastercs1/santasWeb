import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { Address } from 'src/app/interface/address';
import { AppDetails } from 'src/app/interface/app-details';
import { identification } from 'src/app/interface/identification';
import { Note } from 'src/app/interface/note';
import { SearchingServiceService } from 'src/app/searching/searching-service.service';
import { Card } from '../dialog/note-summary/note-summary.component';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-identify',
  templateUrl: './identify.component.html',
  styleUrls: ['./identify.component.scss'],
  imports: [MatCardModule, MatDividerModule, MatListModule, MatTabsModule,CommonModule,MatIconModule],
  standalone: true,
})
export class IdentifyComponent {
 
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
    applicantId: '',
  };
  postAddress: Address | undefined;
  permanentAddress: Address | undefined;
  appDetails: AppDetails = {
    aboriginal: '',
    residency: '',
    filingNumber: '',
    applicantType: '',
    formerNames: '',
    dateStarted: '',
    dateSubmitted: '',
    applicantEligibility: '',
  };
  DATA!: Card[];
  constructor(private service: SearchingServiceService) {}

  ngOnInit() {
    let applicantId = localStorage.getItem('applicantId');
      if (applicantId) {
        this.service.getIdentification(applicantId).subscribe({
          next: (response: any) => {
            if (response) {
              this.identification = response;
            }
          },
        });
      }
  }
  onChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    if(tab === 'Identification Details'){
      let applicantId = localStorage.getItem('applicantId');
      if (applicantId) {
        this.service.getIdentification(applicantId).subscribe({
          next: (response: any) => {
            if (response) {
              this.identification = response;
            }
          },
        });
      }
    }
    if (tab === 'Contact Details') {
      let applicantId = localStorage.getItem('applicantId');
      if (applicantId) {
        this.service.getAddress(applicantId).subscribe({
          next: (response: Address[]) => {
            if (response) {
              response.map((add: Address) => {
                if (add.addressType === 'Postal') {
                  this.postAddress = add;
                }
                if (add.addressType === 'Permanent') {
                  this.permanentAddress = add;
                }
              });
            }
          },
        });
      }
    }
    if (tab === 'Application Details') {
      let applicantId = localStorage.getItem('applicantId');
      if (applicantId) {
        this.service.getAppDetails(applicantId).subscribe({
          next: (response: AppDetails) => {
            if (response) {
              this.appDetails = response;
            }
          },
        });
      }
    }
    if (tab === 'Application Notes') {
      let applicantId = localStorage.getItem('applicantId');
      if (applicantId) {
        this.service.getNotes(applicantId).subscribe({
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
            console.log(this.DATA);
          },
          error: (error) => {
            // Handle error if needed
          },
        });
      }
    }
  }
}
