import { useEffect, useMemo, useState } from "react";
import { Keyboard, KeyboardEventListener, KeyboardMetrics } from "react-native";

export function useKeyboard() {
  const [shown, setShown] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleKeyboardWillShow: KeyboardEventListener = (e) => {
    setShown(true);
    setKeyboardHeight(e.endCoordinates.height);
  };

  const handleKeyboardWillHide: KeyboardEventListener = (e) => {
    setShown(false);
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener("keyboardWillShow", handleKeyboardWillShow),
      Keyboard.addListener("keyboardWillHide", handleKeyboardWillHide),
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  }, []);

  return useMemo(
    () => ({ keyboardHeight, keyboardShown: shown }),
    [keyboardHeight, shown]
  );
}
