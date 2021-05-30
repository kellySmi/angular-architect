export interface ProjectNodeModel {
  name: string;
  path: string;
  fileContents?: string;
  dirContents?: ProjectNodeModel[];
  displayFileDir?: boolean;
  fileObj ?: any;
}
