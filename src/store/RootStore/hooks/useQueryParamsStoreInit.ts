import { useLocation, useNavigate } from "react-router";

import { rootStore } from "../instance";
import { useEffect } from "react";

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const updateQueryParam = (params: Record<string, string | number | null | number[]>) => {
    const searchParams = new URLSearchParams(window.location.hash);

    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== null) {
        searchParams.set(key, value.toString());
      } else {
        searchParams.delete(key);
      }
    });

    navigate(`?${searchParams.toString()}`, { replace: true });
    return searchParams.toString()
  };

  rootStore.query.setSearch(search);
  rootStore.query.updateQueryParam = updateQueryParam;
};

// export const useQueryParamsStoreInit = (): void => {
//   const { search } = useLocation();
//   useEffect(() => {
//     rootStore.query.setSearch(search);
//   }, [search]);
// };
