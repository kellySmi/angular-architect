import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss']
})
export class ProjectTreeComponent implements OnInit {
  @Input() nodes :any[];
  constructor() { }

  ngOnInit(): void {

  }

}
