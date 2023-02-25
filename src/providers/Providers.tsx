import React, { PropsWithChildren } from "react";

import { ToastProvider } from "./ToastProvider";
import { SafeAreaProvider } from "./SafeAreaProvider";
import { StatusBarProvider } from "./StatusBarProvider";
import { StoreProvider } from "./StoreProvider";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <SafeAreaProvider>
        <StatusBarProvider>
          <ToastProvider>{children}</ToastProvider>
        </StatusBarProvider>
      </SafeAreaProvider>
    </StoreProvider>
  );
};
