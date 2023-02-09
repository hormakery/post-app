import React, { useEffect } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  withDelay,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
} from "react-native-reanimated";

import { makeUseStyles } from "../../helpers/makeUseStyles";

export const SpringButton: React.FC<TouchableOpacityProps> = (props) => {
  const x = useSharedValue(0);
  const isFocused = useIsFocused();
  const { styles, palette } = useStyles();

  // start animation here
  const startAnimation = () => {
    x.value = withDelay(
      2000,
      withRepeat(
        withSequence(withSpring(10), withTiming(-10, { duration: 500 })),
        Infinity,
        true
      )
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  useEffect(() => {
    if (isFocused) {
      // only run animation when screen is mounted
      startAnimation();
    } else {
      // stop animation when screen is unmounted
      cancelAnimation(x);
    }
  }, [isFocused]);

  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Animated.View style={animatedStyle}>
        <MaterialCommunityIcons
          size={20}
          color={palette.white}
          name="arrow-top-right"
          style={styles.iconStyle}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const useStyles = makeUseStyles(({ palette, layout }) => ({
  button: {
    width: 80,
    height: 80,
    alignItems: "center",
    borderRadius: 80 / 2,
    justifyContent: "center",
    marginTop: layout.gutter * 3,
    backgroundColor: palette.primary,
  },
  iconStyle: {
    transform: [{ rotate: "45deg" }],
  },
}));
