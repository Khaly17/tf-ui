import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDeviceComponent } from './verify-device.component';

describe('VerifyDeviceComponent', () => {
  let component: VerifyDeviceComponent;
  let fixture: ComponentFixture<VerifyDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyDeviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
