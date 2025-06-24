export type Left<E> = { type: 'left'; error: E };
export type Right<V> = { type: 'right'; value: V };
export type Either<E, V> = Left<E> | Right<V>;

export const leftFrom = <E>(value: E): Left<E> => ({
    type: 'left',
    error: value,
});

export const rightFrom = <V>(value: V): Right<V> => ({
    type: 'right',
    value: value,
});
