import { AdminSchema } from '@schema/admin/admin-schema.ts';
import { atom } from 'jotai';

export const adminProfileAtom = atom<AdminSchema | null>(null);