import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPortal } from './company-portal';

describe('CompanyPortal', () => {
  let component: CompanyPortal;
  let fixture: ComponentFixture<CompanyPortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyPortal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPortal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
