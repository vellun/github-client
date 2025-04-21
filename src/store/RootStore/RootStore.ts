import { AuthStore } from "store/RootStore/AuthStore";
import { QueryParamsStore } from "store/RootStore/QueryParamsStore";

export class RootStore {
  readonly query = new QueryParamsStore();
  readonly auth = new AuthStore();
}
