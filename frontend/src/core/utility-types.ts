export type WithoutId<T> = Omit<T, 'id'>;
export type PartialWithId<T extends Record<'id', unknown>> = Pick<T, 'id'> & Partial<T>;
export type OnlyId<T extends Record<'id', unknown>> = Pick<T, 'id'>;
