import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { FileFolderComponent } from './components/file-folder/file-folder.component';
import { ReadFilePipe } from './pipes/read-file.pipe';
import { EndsWithPipe } from './pipes/ends-with.pipe';



@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective,FileFolderComponent, ReadFilePipe, EndsWithPipe],
  imports: [CommonModule, TranslateModule, FormsModule,],
  exports: [TranslateModule, WebviewDirective, FormsModule,FileFolderComponent,ReadFilePipe, EndsWithPipe]
})
export class SharedModule {}
