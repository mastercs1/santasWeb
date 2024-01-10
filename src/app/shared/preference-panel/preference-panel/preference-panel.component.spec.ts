import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencePanelComponent } from './preference-panel.component';

describe('PreferencePanelComponent', () => {
  let component: PreferencePanelComponent;
  let fixture: ComponentFixture<PreferencePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreferencePanelComponent]
    });
    fixture = TestBed.createComponent(PreferencePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
