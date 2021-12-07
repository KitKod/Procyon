export type WithoutId<T, OMIT extends keyof T = never> = Omit<T, 'id' | OMIT>;
export type PartialWithId<T extends Record<'id', unknown>, OMIT extends keyof T = never> = {
    id: NonNullable<T['id']>;
} & Partial<Omit<T, 'id' | OMIT>>;
export type OnlyId<T extends Record<'id', unknown>> = Pick<T, 'id'>;
