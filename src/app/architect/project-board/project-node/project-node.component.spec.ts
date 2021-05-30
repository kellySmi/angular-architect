import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNodeComponent } from './project-node.component';

describe('ProjectNodeComponent', () => {
  let component: ProjectNodeComponent;
  let fixture: ComponentFixture<ProjectNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
