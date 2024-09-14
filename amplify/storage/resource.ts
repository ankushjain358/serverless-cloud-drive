import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'CloudDrive',
  access: (allow) => ({
    'profile-pictures/*': [
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    'drive/*': [
      allow.authenticated.to(['read', 'write', 'delete'])
    ]
  })
});