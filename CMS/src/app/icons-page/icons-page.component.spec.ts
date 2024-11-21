import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsPageComponent } from './icons-page.component';

describe('IconsPageComponent', () => {
  let component: IconsPageComponent;
  let fixture: ComponentFixture<IconsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconsPageComponent]
    });
    fixture = TestBed.createComponent(IconsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
