import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KahlidServicesComponent } from './kahlid-services.component';

describe('KahlidServicesComponent', () => {
  let component: KahlidServicesComponent;
  let fixture: ComponentFixture<KahlidServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KahlidServicesComponent]
    });
    fixture = TestBed.createComponent(KahlidServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
