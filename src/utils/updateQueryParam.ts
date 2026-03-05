import { rootStore } from "store/RootStore";

export const updateQueryParam = (params: Record<string, string | number | null | number[]>) => {
  const searchParams = new URLSearchParams(window.location.hash.split("?")[1] || "");
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== "" && value !== null) {
      searchParams.set(key, value.toString());
    } else {
      searchParams.delete(key);
    }
  });
  rootStore.query.navigate(`?${searchParams.toString()}`, { replace: true });
  return searchParams.toString();
};
