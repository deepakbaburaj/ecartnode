import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelpComponent } from './delp.component';

describe('DelpComponent', () => {
  let component: DelpComponent;
  let fixture: ComponentFixture<DelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
