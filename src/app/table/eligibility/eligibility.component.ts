import { Component, Input, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PreferenceEligibility } from 'src/app/interface/preference-eligibility';
import { DeemDialogServiceService } from 'src/app/service/deem-dialog-service.service';



@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss'],
  standalone:true,
  imports: [MatTableModule,MatButtonModule]
})
export class EligibilityComponent implements OnInit{
 
  @Input()
  dataSource!:PreferenceEligibility[];
  constructor(private stepperDialogService: DeemDialogServiceService){

  }

  ngOnInit(): void {
    console.log("HERE");
   console.log("son componewnt = " +this.dataSource);
  }
  
  displayedColumns: string[] = ['status', 'systemValue', 'howDerived', 'deemedValue', 'whyDeemed', 'whyUndeemed', 'when', 'who','action'];
  openStepper(id: string) {
    console.log("statusid= " +id)
    this.stepperDialogService.openStepperDialog(id);
  }
}

