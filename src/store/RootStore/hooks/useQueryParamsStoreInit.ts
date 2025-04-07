import { useLocation } from "react-router";

import rootStore from "../instance";

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  console.log("SEARCHHHHHH", search)
  rootStore.query.setSearch(search);
};
