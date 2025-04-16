import { NavigateFunction } from 'react-router-dom';

export const updateQueryParam = (
  navigate: NavigateFunction,
  params: Record<string, string | number | null | number[]>,
) => {
  const searchParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== null) {
      searchParams.set(key, value.toString());
    } else {
      searchParams.delete(key);
    }
  });

  navigate(`?${searchParams.toString()}`, { replace: true });
};
