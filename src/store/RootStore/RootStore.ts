import { PaginationStore } from "store/RootStore/PaginationStore";
import { QueryParamsStore } from "store/RootStore/QueryParamsStore";

export class RootStore {
  readonly query = new QueryParamsStore();
  // readonly pagination = new PaginationStore();
}
