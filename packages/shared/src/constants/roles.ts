import { UserRole } from '@janbhasha/domain';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.LEARNER]: [
    'lessons:read',
    'lessons:progress:write',
    'quizzes:attempt',
    'profile:read',
    'profile:update',
    'sync:execute',
  ],
  [UserRole.EDUCATOR]: [
    'lessons:read',
    'lessons:write',
    'lessons:publish',
    'quizzes:create',
    'quizzes:grade',
    'students:progress:read',
    'profile:read',
    'profile:update',
    'sync:execute',
  ],
  [UserRole.ADMINISTRATOR]: [
    'users:manage',
    'courses:manage',
    'content:moderate',
    'analytics:view',
    'system:configure',
    'lessons:write',
    'lessons:publish',
    'quizzes:create',
    'sync:execute',
  ],
  [UserRole.GUEST]: [
    'lessons:sample:read',
  ],
};

export function hasPermission(role: UserRole, requiredPermission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(requiredPermission) || role === UserRole.ADMINISTRATOR;
}
