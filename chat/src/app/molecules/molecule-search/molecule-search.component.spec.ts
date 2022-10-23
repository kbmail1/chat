import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeSearchComponent } from './molecule-search.component';

describe('MoleculeSearchComponent', () => {
  let component: MoleculeSearchComponent;
  let fixture: ComponentFixture<MoleculeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoleculeSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoleculeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
