
import { atom } from 'jotai';
import { AdminType } from '@schema/admin/admin-schema.ts';

export const adminProfileAtom = atom<AdminType | null>(null);