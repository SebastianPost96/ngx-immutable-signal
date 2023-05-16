import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxStateSignalComponent } from './ngx-state-signal.component';

describe('NgxStateSignalComponent', () => {
  let component: NgxStateSignalComponent;
  let fixture: ComponentFixture<NgxStateSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxStateSignalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxStateSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
