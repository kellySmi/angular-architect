import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileFolderService {
  public uploadHandle$: Observable<any>;
  constructor() { }
  public handleUpload(){
    return this.uploadHandle$;
  }
}
