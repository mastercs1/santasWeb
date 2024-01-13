import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeemDialogComponent } from './deem-dialog.component';

describe('DeemDialogComponent', () => {
  let component: DeemDialogComponent;
  let fixture: ComponentFixture<DeemDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeemDialogComponent]
    });
    fixture = TestBed.createComponent(DeemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
