import { useLocation, useNavigate } from "react-router";

import { useEffect } from "react";
import { rootStore } from "../instance";

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const updateQueryParam = (params: Record<string, string | number | null | number[]>) => {
    const searchParams = new URLSearchParams(window.location.hash.split("?")[1] || "");
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== "") {
        searchParams.set(key, value.toString());
      } else {
        searchParams.delete(key);
      }
    });
    navigate(`?${searchParams.toString()}`, { replace: true });
    return searchParams.toString();
  };
  useEffect(() => {
    rootStore.query.setSearch(search);
    rootStore.query.updateQueryParam = updateQueryParam;
  }, [search]);
};
