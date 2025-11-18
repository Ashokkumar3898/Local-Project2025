import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyPortalComponent } from './company-portal.component';

describe('CompanyPortal', () => {
  let component: CompanyPortalComponent;
  let fixture: ComponentFixture<CompanyPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyPortalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
