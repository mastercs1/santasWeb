import { Component, Input } from '@angular/core';
import { PreferenceRank } from 'src/app/interface/preference-rank';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DeemDialogServiceService } from 'src/app/service/deem-dialog-service.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss'],
  standalone: true,
  imports: [MatTableModule,MatButtonModule],
})
export class RankComponent {
  @Input()
  dataSource!: PreferenceRank[];
  constructor(private service: DeemDialogServiceService) {}
  openStepper(id: string) {
    this.service.openStepperDialog(id);
  }
  displayedColumns: string[] = [
    'qualification',
    'rankName',
    'rankType',
    'rankStatus',
    'systemRank',
    'howDerived',
    'deemedValue',
    'whydeemed',
    'whyUndeemed',
    'when',
    'who',
    'action'
  ];
}
