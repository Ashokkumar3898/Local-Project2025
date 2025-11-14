import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRequestDTO } from './employee-request.dto';

describe('EmployeeRequestDTO', () => {
  let component: EmployeeRequestDTO;
  let fixture: ComponentFixture<EmployeeRequestDTO>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeRequestDTO]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeRequestDTO);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
