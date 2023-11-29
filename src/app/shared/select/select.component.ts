import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {TextConstantsComponent} from "src/app/constants/text.constants.component";
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  imports:[MatSelectModule,ReactiveFormsModule,CommonModule],
  standalone: true
})
export class SelectComponent implements OnInit {
  @Input()
  label = '';

  @Input()
  items: any[] = [];

  @Input()
  hintMessage? = '';

  @Input()
  errorMessage = TextConstantsComponent.SELECT_OPTION_ERROR_MESSAGE;

  @Input()
  control = new UntypedFormControl();

  @Input()
  fullObjectAsValue = false;

  @Input()
  displayAttribute = '';

  @Input()
  valueAttribute = '';

  @Input()
  panelClass = '';

  @Output()
  changed = new EventEmitter<MatSelectChange>();

  placeholder = TextConstantsComponent.SELECT_PLACEHOLDER;

  constructor() {}

  ngOnInit(): void {}
}
