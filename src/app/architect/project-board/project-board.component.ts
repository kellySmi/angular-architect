import { Component, Input, OnInit } from '@angular/core';
import { ProjectNodeModel } from '../models/ProjectNode';


@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit {
  @Input() nodes?: ProjectNodeModel[];
  // public allRows = new Array(20);
  // public allCols = new Array(6);

  constructor() { }

  ngOnInit(): void {
  }

}
