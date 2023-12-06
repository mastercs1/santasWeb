import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSummaryComponent } from './note-summary.component';

describe('NoteSummaryComponent', () => {
  let component: NoteSummaryComponent;
  let fixture: ComponentFixture<NoteSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteSummaryComponent]
    });
    fixture = TestBed.createComponent(NoteSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
