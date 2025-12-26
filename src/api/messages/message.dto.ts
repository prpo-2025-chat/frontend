export enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED'
}

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  status: MessageStatus;
  readBy: string[];
  dateSent: string;
}

export interface MessageDto {
  id?: string;
  channelId: string;
  senderId: string;
  content: string;
  status?: MessageStatus;
  readBy?: string[];
  dateSent?: string;
}
