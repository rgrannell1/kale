
export function constant<T> (arg: T): () => T {
  return () => arg
}
