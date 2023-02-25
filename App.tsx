import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Providers } from "./src/providers";
import { Navigation } from "./src/navigation";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <Navigation />
      </Providers>
    </GestureHandlerRootView>
  );
}
