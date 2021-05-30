import { TestBed } from '@angular/core/testing';

import { FileFolderService } from './file-folder.service';

describe('FileFolderService', () => {
  let service: FileFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
