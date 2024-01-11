import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeemComponentComponent } from './deem-component.component';

describe('DeemComponentComponent', () => {
  let component: DeemComponentComponent;
  let fixture: ComponentFixture<DeemComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeemComponentComponent]
    });
    fixture = TestBed.createComponent(DeemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
