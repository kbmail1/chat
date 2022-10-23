import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatterBoxComponent } from './chatter-box.component';

describe('ChatterBoxComponent', () => {
  let component: ChatterBoxComponent;
  let fixture: ComponentFixture<ChatterBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatterBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
