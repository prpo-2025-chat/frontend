export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT'
}

export interface MediaDto {
  id: string;
  uploaderId: string;
  filename: string;
  contentType: string;
  mediaType: MediaType;
  size: number;
  s3Key: string;
  uploadedAt: string;
  downloadUrl: string;
}
