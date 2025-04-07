import { useLocation } from "react-router";

import rootStore from "../instance";

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  rootStore.query.setSearch(search);
};
