import { QueryParamsStore } from "store/RootStore/QueryParamsStore";

export class RootStore {
  readonly query = new QueryParamsStore();
}
