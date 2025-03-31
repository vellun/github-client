import React from "react";

export const useFetching = (callback: () => Promise<any>) => {
  const [error, setError] = React.useState<string | null>(null);

  const fetching = async () => {
    try {
      await callback();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  return [fetching, error] as const;
};
