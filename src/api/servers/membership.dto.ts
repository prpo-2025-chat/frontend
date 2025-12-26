export enum MembershipRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER'
}

export enum MembershipStatus {
  NORMAL = 'NORMAL',
  BANNED = 'BANNED'
}

export interface Membership {
  id: string;
  userId: string;
  serverId: string;
  role: MembershipRole;
  status?: MembershipStatus;
}
