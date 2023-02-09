import React from "react";
import { View } from "react-native";
import hexToRgba from "hex-to-rgba";

import { makeUseStyles } from "../../helpers/makeUseStyles";

type CircleOvalType = {
  opacity: number;
  size: number;
};

export const CircleOval: React.FC<CircleOvalType> = (props) => {
  const { styles, layout, palette } = useStyles();
  const size = layout.screen.width + props.size;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: hexToRgba(palette.text, props.opacity),
        },
      ]}
    />
  );
};

const useStyles = makeUseStyles(({ layout }) => ({
  container: {
    borderWidth: 1,
    position: "absolute",
  },
}));
