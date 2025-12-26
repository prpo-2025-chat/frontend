export enum PresenceStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export interface PresenceDto {
  userId: string;
  status: PresenceStatus;
  lastSeen: string;
}
