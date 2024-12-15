import { Branch } from '@schema/branch-schema.ts';
import { atom } from 'jotai';

export const branchAtom = atom<Branch[]>([]);
export const currentBranchAtom = atom<Branch | null>(null);