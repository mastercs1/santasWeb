import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingComponentComponent } from './searching-component.component';

describe('SearchingComponentComponent', () => {
  let component: SearchingComponentComponent;
  let fixture: ComponentFixture<SearchingComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchingComponentComponent]
    });
    fixture = TestBed.createComponent(SearchingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
