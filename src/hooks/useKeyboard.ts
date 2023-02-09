import { useEffect, useState } from "react";
import { Keyboard, KeyboardEventListener, KeyboardMetrics } from "react-native";

const emptyCoordinates = Object.freeze({
  width: 0,
  height: 0,
  screenY: 0,
  screenX: 0,
});

const initialValue = { end: emptyCoordinates, start: emptyCoordinates };

export function useKeyboard() {
  const [shown, setShown] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [coordinates, setCoordinates] = useState<{
    start: undefined | KeyboardMetrics;
    end: KeyboardMetrics;
  }>(initialValue);

  const handleKeyboardWillShow: KeyboardEventListener = (e) => {
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
  };

  const handleKeyboardDidShow: KeyboardEventListener = (e) => {
    setShown(true);
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
    setKeyboardHeight(e.endCoordinates.height);
  };

  const handleKeyboardWillHide: KeyboardEventListener = (e) => {
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
  };

  const handleKeyboardDidHide: KeyboardEventListener = (e) => {
    setShown(false);
    if (e) {
      setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
    } else {
      setCoordinates(initialValue);
      setKeyboardHeight(0);
    }
  };

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener("keyboardWillShow", handleKeyboardWillShow),
      Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow),
      Keyboard.addListener("keyboardWillHide", handleKeyboardWillHide),
      Keyboard.addListener("keyboardDidHide", handleKeyboardDidHide),
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  }, []);

  return {
    coordinates,
    keyboardHeight,
    keyboardShown: shown,
  };
}
