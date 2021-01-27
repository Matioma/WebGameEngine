import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviourViewComponent } from './behaviour-view.component';

describe('BehaviourViewComponent', () => {
  let component: BehaviourViewComponent;
  let fixture: ComponentFixture<BehaviourViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehaviourViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviourViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
