import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSenalComponent } from './detalleSenal.component';

describe('DetalleSenalComponent', () => {
  let component: DetalleSenalComponent;
  let fixture: ComponentFixture<DetalleSenalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSenalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSenalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
