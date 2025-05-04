import { useLocation, useNavigate } from "react-router";

import { useEffect } from "react";
import { rootStore } from "../instance";

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    rootStore.query.setSearch(search);
    rootStore.query.setNavigate(navigate);
  }, [search, navigate]);
};
