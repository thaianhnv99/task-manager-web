import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PioritySelectComponent } from './piority-select.component';

describe('PioritySelectComponent', () => {
  let component: PioritySelectComponent;
  let fixture: ComponentFixture<PioritySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PioritySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PioritySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
