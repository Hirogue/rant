export const IdentityEnum = {
  USER: 'user',
  INVESTOR: 'investor',
  FINANCER: 'financer',
  PROVIDER: 'provider',
  TOURIST: 'tourist',
};

export const IFModeEnum = {
  EQUITY: 'equity',
  CLAIM: 'claim',
};

export const ProjectStatusEnum = {
  PENDING: 'pending',
  REJECTED: 'rejected',
  CHECKED: 'checked',
  WAITING: 'waiting',
  FOLLOWING: 'following',
  CANCELLED: 'cancelled',
  FINISHED: 'finished',
};

export const UserStatusEnum = {
  NORMAL: 0,
  PENDING: 1,
  REJECTED: 2,
  CHECKED: 3,
  DELETED: 4,
};

export const UserLevelEnum = {
  V0: 0,
  V1: 1,
  V2: 2,
};

export const UserTypeEnum = {
  PERSONAL: 'personal',
  ENTERPRISE: 'enterprise',
};

export const LogTypeEnum = {
  PROJECT: 'project',
  CAPITAL: 'capital',
  EXPERT: 'expert',
};
