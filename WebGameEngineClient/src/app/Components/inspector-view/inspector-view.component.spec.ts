import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorViewComponent } from './inspector-view.component';

describe('InspectorViewComponent', () => {
  let component: InspectorViewComponent;
  let fixture: ComponentFixture<InspectorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectorViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
