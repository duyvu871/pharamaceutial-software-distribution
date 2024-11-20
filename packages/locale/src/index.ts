export type VI = typeof import('./vi.json');
export type EN = typeof import('./en.json');

export type Locale = 'vi' | 'en';
export {default as vi} from './vi.json';
export {default as en} from './en.json';