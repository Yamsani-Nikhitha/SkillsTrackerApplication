import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHrDetailsComponent } from './create-hr-details.component';

describe('CreateHrDetailsComponent', () => {
  let component: CreateHrDetailsComponent;
  let fixture: ComponentFixture<CreateHrDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHrDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
