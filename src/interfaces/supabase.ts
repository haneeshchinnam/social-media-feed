export interface Metadata {
    eTag: string;
    size: number;
    mimetype: string;
    cacheControl: string;
    lastModified: string;
    contentLength: number;
    httpStatusCode: number;
  }
  
  export interface FileObject {
    name: string;
    id: string;
    updated_at: string;
    created_at: string;
    last_accessed_at: string;
    mimetype: string;
  }
  