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

export const mapRight = <R, R2, L = unknown>(
  either: Either<L, R>,
  fn: (value: R) => R2,
): Either<L, R2> => {
  if (either.type === "right") {
    return rightFrom(fn(either.value));
  }

  return either;
};
export const mapLeft = <R, L, L2>(
  either: Either<L, R>,
  fn: (value: L) => L2,
): Either<L2, R> => {
  if (either.type === "left") {
    return leftFrom(fn(either.error));
  }

  return either;
};

export const matchEither = <L, R, V>(
  either: Either<L, R>,
  matchers: {
    left: (error: L) => V;
    right: (value: R) => V;
  },
): V => {
  if (either.type === "left") {
    return matchers.left(either.error);
  }

  return matchers.right(either.value);
};
