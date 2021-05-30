import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-folder',
  templateUrl: './file-folder.component.html',
  styleUrls: ['./file-folder.component.scss']
})
export class FileFolderComponent implements OnInit {
  @Output() files: FileList;

  fileFolders: any[];

  constructor() { }

  ngOnInit(): void {
  }
  loadFiles(files){
    this.files = files;
  }

}
