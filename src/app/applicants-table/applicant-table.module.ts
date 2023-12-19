import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';

import { MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule  } from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {Sort, MatSortModule} from '@angular/material/sort';
import { ApplicantsTableComponent } from './applicants-table.component';
import {NoteComponent} from '../shared/dialog/note/note.component'
import { MatPaginatorModule } from '@angular/material/paginator';

export const MATERIAL_MODULES = [MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, MatCardModule,MatSortModule,MatPaginatorModule];
//define an array which include all modual from shared

export const ANGULAR_MODULES: any[] = [CommonModule,RouterModule];


@NgModule({
  declarations: [ApplicantsTableComponent],
  imports: [
    MATERIAL_MODULES,
    ANGULAR_MODULES,
    NoteComponent,
    MatBadgeModule
  ],
  exports :[ApplicantsTableComponent]
})

export class ApplicantTableModule { }
