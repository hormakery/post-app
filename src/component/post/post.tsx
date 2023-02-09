import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { makeUseStyles } from "../../helpers/makeUseStyles";
import fonts from "../../constants/fonts";
import { NunitoSans_200ExtraLight } from "@expo-google-fonts/nunito-sans";
import { Data } from "../data";

export const Post: React.FC<TouchableOpacityProps> = (props) => {
  const { styles, palette } = useStyles();

  return (
    <TouchableOpacity {...props} style={styles.container}>
      {Data.map((items, index) => (
        <View style={styles.postContainer} key={index}>
          <View style={styles.wrapper}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.image}
                source={{
                  uri: items.image,
                }}
              />
              <View style={{ flexDirection: "column", marginLeft: 8 }}>
                <Text style={styles.name}>{items.name}</Text>
                <Text style={styles.time}>{items.time}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.icons}>{items.icons}</Text>
              <Text style={{ color: palette.outline, fontSize: fonts.size.s }}>
                {" "}
                {items.numberOfMessage}
              </Text>
            </View>
          </View>
          <Text style={styles.title}>{items.title}</Text>
          <View style={styles.share}>
            <MaterialCommunityIcons
              name="share-outline"
              size={25}
              color={palette.grey}
            />
          </View>
        </View>
      ))}
    </TouchableOpacity>
  );
};

const useStyles = makeUseStyles(({ palette, layout }) => ({
  container: {
    opacity: 1,
  },
  postContainer: {
    marginBottom: 30,
    borderRadius: layout.gutter,
    paddingVertical: layout.gutter * 2,
    paddingHorizontal: layout.gutter,
    backgroundColor: palette.postBackground,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: layout.gutter * 3,
    height: layout.gutter * 3,
    borderRadius: layout.gutter * 2,
  },
  name: {
    color: palette.text,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semi,
  },
  time: {
    marginTop: 5,
    color: palette.grey,
    fontSize: fonts.size.s,
  },
  icons: {
    fontSize: fonts.size.s,
  },
  title: {
    lineHeight: 24,
    color: palette.text,
    fontSize: fonts.size.xxlg / 2,
    paddingVertical: layout.gutter,
  },
  share: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
}));
