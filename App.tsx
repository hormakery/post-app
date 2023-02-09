import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Navigation } from "./src/navigation";
import { Providers } from "./src/providers";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <Navigation />
      </Providers>
    </GestureHandlerRootView>
  );
}
