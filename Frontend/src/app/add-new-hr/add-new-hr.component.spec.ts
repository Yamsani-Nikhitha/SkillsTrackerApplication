import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewHRComponent } from './add-new-hr.component';

describe('AddNewHRComponent', () => {
  let component: AddNewHRComponent;
  let fixture: ComponentFixture<AddNewHRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewHRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
