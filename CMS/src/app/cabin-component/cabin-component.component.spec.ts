import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinComponentComponent } from './cabin-component.component';

describe('CabinComponentComponent', () => {
  let component: CabinComponentComponent;
  let fixture: ComponentFixture<CabinComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabinComponentComponent]
    });
    fixture = TestBed.createComponent(CabinComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
