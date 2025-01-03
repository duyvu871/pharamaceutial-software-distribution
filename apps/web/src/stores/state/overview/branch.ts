import { Branch, BranchType } from '@schema/branch-schema.ts';
import { atom } from 'jotai';

export const branchAtom = atom<BranchType[]>([]);
export const currentBranchAtom = atom<BranchType | null>(null);