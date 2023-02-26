import React, { useEffect } from "react";
import { Text, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import { CircleOval } from "../../component/circle_oval";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../types/navigation";
import { SpringButton } from "../../component/spring_button";

const DEFAULT_CIRCLE_SIZE = 50;

export const OnboardingScreen: React.FC<RootTabScreenProps<"Onboarding">> = ({
  navigation,
}) => {
  const { styles } = useStyles();
  const handlePress = () => navigation.replace("Home");

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <CircleOval size={DEFAULT_CIRCLE_SIZE} opacity={0.2} />
      <CircleOval size={DEFAULT_CIRCLE_SIZE * 4.5} opacity={0.1} />
      <CircleOval size={DEFAULT_CIRCLE_SIZE * 8} opacity={0.1} />

      <View style={styles.textContainer}>
        <Text style={styles.text}>Node</Text>
        <View style={styles.textPunctuation} />
      </View>
      <SpringButton onPress={handlePress} />
    </View>
  );
};

const useStyles = makeUseStyles(({ fonts, palette, edgeInsets, layout }) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: edgeInsets.top,
    paddingBottom: edgeInsets.bottom,
    backgroundColor: palette.background,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  text: {
    color: palette.text,
    fontSize: fonts.size.xxlg,
    fontWeight: fonts.weight.bold,
    fontFamily: fonts.variants.bold,
  },
  textPunctuation: {
    marginLeft: 3,
    width: layout.gutter / 2,
    height: layout.gutter / 2,
    borderRadius: layout.gutter / 2,
    backgroundColor: palette.primary,
  },
}));
