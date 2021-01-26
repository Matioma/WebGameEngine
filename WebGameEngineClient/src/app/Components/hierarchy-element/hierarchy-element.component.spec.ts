import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyElementComponent } from './hierarchy-element.component';

describe('HierarchyElementComponent', () => {
  let component: HierarchyElementComponent;
  let fixture: ComponentFixture<HierarchyElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HierarchyElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
