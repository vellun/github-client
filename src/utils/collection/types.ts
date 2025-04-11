export type CollectionT<Uid extends string | number, T> = {
  order: Uid[];
  entities: Record<Uid, T>;
};
