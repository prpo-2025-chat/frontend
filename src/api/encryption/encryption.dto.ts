export interface FileEncryptionDto {
  fileName: string;
  data: string;
}

export interface PasswordHashDto {
  password: string;
  hashedPassword?: string;
}
