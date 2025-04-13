import React from "react";
import { IStoreWithReaction } from "store/interfaces";

export const useStore = <T extends IStoreWithReaction>(creator: () => T): T => {
  const store = creator();

  React.useEffect(() => {
    return () => store.destroy();
  }, [store]);

  return store;
};
