import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { PreferenceDetails } from 'src/app/interface/preference-details';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PreferenceServiceService } from 'src/app/service/preference-service.service';
import { PreferenceOverallDeemStatus } from 'src/app/interface/preference-overall-deem-status';
import { DeemComponentComponent } from '../../overall-deem-component/overall-deem-component.component';
import { DeemDialogServiceService } from 'src/app/service/deem-dialog-service.service';
import { EligibilityComponent } from 'src/app/table/eligibility/eligibility.component';
import { PreferenceEligibility } from 'src/app/interface/preference-eligibility';

@Component({
  selector: 'app-preference-panel',
  templateUrl: './preference-panel.component.html',
  styleUrls: ['./preference-panel.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    DeemComponentComponent,
    EligibilityComponent,
  ],
})

/** the clear design is preference id changes than destroy current module then using new preference id then ngonchange . to do this we need preference be a input value instead of value from service. **/
/* the current design is preference id changes get from service , all data has been set in ngOnit , so when cross preference in same tab, it will faster but the design is bad and 
in Oninit take 5 requests instead of 1 request. which one is better in real use , i dont know . need to test it carefully. But personal i like first one . But this implements is 
using second one just for practice. 
*/
export class PreferencePanelComponent implements OnInit {
  preferenceId: string | undefined;
  preferenceDetails: PreferenceDetails | undefined;
  overallDeem: PreferenceOverallDeemStatus | undefined;
  dataSource!: PreferenceEligibility[];

  constructor(
    private preferenceService: PreferenceServiceService,
    private stepperDialogService: DeemDialogServiceService
  ) {}

  ngOnInit() {
    this.preferenceService.getPreferenceId().subscribe((preferenceId) => {
      this.preferenceId = preferenceId;

      if (this.preferenceId) {
        this.getPreferenceDetails();
        this.getOverallDeemStatus();
        this.getEligibility();
      }
    });
  }

  onChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    if (tab === 'Preference Details') {
      this.getPreferenceDetails();
    }
    if (tab === 'Overall Deemed Status') {
      this.getOverallDeemStatus();
    }

    if (tab === 'Eligibility') {
      this.getEligibility();
    }
    if (tab === 'Application Notes') {
    }
  }

  private getEligibility() :void{
    if (this.preferenceId) {
      this.preferenceService.getPreferenceStatus(this.preferenceId).subscribe({
        next: (response: PreferenceEligibility[]) => {
          console.log(response);
          this.dataSource = response;
        },
      });
    }
  }

  private getOverallDeemStatus() :void{
    if (this.preferenceId) {
      this.preferenceService.getOverallDeem(this.preferenceId).subscribe({
        next: (response: PreferenceOverallDeemStatus) => {
          this.overallDeem = response;
          console.log(this.overallDeem);
        },
      });
    }
  }

  private getPreferenceDetails() :void{
    if (this.preferenceId) {
      this.preferenceService.getPreferenceDetails(this.preferenceId).subscribe({
        next: (response: PreferenceDetails) => {
          this.preferenceDetails = response;
        },
      });
    }
  }

  openStepper(id: string) {
    this.stepperDialogService.openStepperDialog(id);
  }
  undeem() {
    console.log('2');
  }
}
