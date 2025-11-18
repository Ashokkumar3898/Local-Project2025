import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';

describe('SharedService', () => {
  let component: SharedService;
  let fixture: ComponentFixture<SharedService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
