import { AuthStore } from "store/RootStore/AuthStore";

export class RootStore {
  readonly auth = new AuthStore();
}
