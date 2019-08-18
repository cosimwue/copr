import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitStatsComponent } from './unit-stats.component';

describe('UnitStatsComponent', () => {
  let component: UnitStatsComponent;
  let fixture: ComponentFixture<UnitStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
