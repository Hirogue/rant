import AccessControl from 'accesscontrol';

const ac = new AccessControl();

export const AccessAction = {
  CREATE_ANY: 'create:any',
  CREATE_OWN: 'create:any',
  READ_ANY: 'read:any',
  READ_OWN: 'read:own',
  UPDATE_ANY: 'update:any',
  UPDATE_OWN: 'update:own',
  DELETE_ANY: 'delete:any',
  DELETE_OWN: 'delete:own',
};

export const check = (resource, action = AccessAction.READ_ANY) => {
  let permission = { granted: false };

  if (ac.role) {
    switch (action) {
      case AccessAction.CREATE_ANY:
        permission = ac.can(ac.role).createAny(resource);
        break;
      case AccessAction.CREATE_OWN:
        permission = ac.can(ac.role).createOwn(resource);
        break;
      case AccessAction.READ_ANY:
        permission = ac.can(ac.role).readAny(resource);
        break;
      case AccessAction.READ_OWN:
        permission = ac.can(ac.role).readOwn(resource);
        break;
      case AccessAction.UPDATE_ANY:
        permission = ac.can(ac.role).updateAny(resource);
        break;
      case AccessAction.UPDATE_OWN:
        permission = ac.can(ac.role).updateOwn(resource);
        break;
      case AccessAction.DELETE_ANY:
        permission = ac.can(ac.role).deleteAny(resource);
        break;
      case AccessAction.DELETE_OWN:
        permission = ac.can(ac.role).deleteOwn(resource);
        break;
    }
  }

  if (ac.user && ac.isSuperAdmin) return true;

  return permission.granted;
};

export default ac;
