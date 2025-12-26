export enum ServerType {
  GROUP = 'GROUP',
  DM = 'DM'
}

export interface ServerProfile {
  avatarUrl?: string;
  bio?: string;
}

export interface Server {
  id: string;
  type: ServerType;
  name: string;
  profile?: ServerProfile;
}

export interface ServerCreateRequest {
  name: string;
  type: ServerType;
  profile?: ServerProfile;
}
