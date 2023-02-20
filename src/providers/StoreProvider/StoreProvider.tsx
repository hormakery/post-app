import React, { PropsWithChildren } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
