import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTreeNodeComponent } from './project-tree-node.component';

describe('ProjectTreeNodeComponent', () => {
  let component: ProjectTreeNodeComponent;
  let fixture: ComponentFixture<ProjectTreeNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTreeNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
