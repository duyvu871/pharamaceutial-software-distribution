import { atom } from "jotai";
import { ProfilePayloadType } from '@schema/user-schema.ts';

export const userProfileAtom = atom<ProfilePayloadType | null>(null);