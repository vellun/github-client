import { QueryParamsStore } from "store/RootStore/QueryParamsStore";

export default class RootStore {
  readonly query = new QueryParamsStore();
}
