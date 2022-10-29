import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MProgressBarComponent } from './m-progress-bar.component';

describe('MProgressBarComponent', () => {
  let component: MProgressBarComponent;
  let fixture: ComponentFixture<MProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MProgressBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
