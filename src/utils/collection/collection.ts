import { action, computed, makeObservable, observable } from "mobx";

export class Collection<Uid extends string | number, T> {
  order: Uid[] = [];
  entities: Record<Uid, T> = {};

  constructor() {
    this.order = [];
    this.entities = {};

    makeObservable(this, {
      order: observable,
      entities: observable,
      setAll: action,
      getAll: computed,
      clear: action,
    });
  }

  clear(): void {
    this.order = [];
    this.entities = {};
  }

  get getAll(): T[] {
    return this.order.map((id) => this.entities[id]);
  }

  setAll(order: Uid[], entities: Record<Uid, T>): void {
    this.order = order;
    this.entities = entities;
  }
}
