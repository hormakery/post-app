import React from "react";
import hexToRgba from "hex-to-rgba";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity } from "react-native";

import { makeUseStyles } from "../../helpers/makeUseStyles";
import { PostInterface } from "../../types/types";

type PostType = PostInterface & {
  isComment?: boolean;
  hasBottomBorder?: boolean;
  onPress?: VoidFunction;
};

export const Post: React.FC<PostType> = (props) => {
  const { styles, palette } = useStyles();

  return (
    <TouchableOpacity
      disabled={props.isComment}
      onPress={props.onPress}
      style={[
        styles.container,
        props.isComment && styles.commentContainer,
        props.hasBottomBorder && styles.commentBorder,
        props.isComment && !props.hasBottomBorder && styles.commentDistance,
      ]}
    >
      <View style={styles.wrapper}>
        <View style={{ flexDirection: "row" }}>
          <Image style={styles.image} source={{ uri: props.image }} />
          <View style={{ flexDirection: "column", marginLeft: 8 }}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.time}>{props.time}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.icons}>{props.icons}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={props.isComment ? 0 : 3}>
        {props.body}
      </Text>

      {props.isComment ? (
        <View style={styles.allIcons}>
          <MaterialCommunityIcons
            name="arrow-up"
            size={13}
            style={styles.postIcons}
            color={palette.checked}
          />
          <Text style={[styles.iconText, styles.postIcons]}>
            {props.numberOfShare}
          </Text>
          <MaterialCommunityIcons
            name="arrow-down"
            size={13}
            color={palette.red}
            style={styles.postIcons}
          />
          <MaterialCommunityIcons
            name="message"
            size={13}
            color={palette.grey}
            style={[styles.postIcons, styles.messageIcon]}
          />
          <Text style={styles.iconText}>{props.numberOfComments}</Text>
        </View>
      ) : (
        <View style={styles.share}>
          <MaterialCommunityIcons
            name="share-outline"
            size={25}
            color={palette.grey}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const useStyles = makeUseStyles(({ fonts, palette, layout }) => ({
  container: {
    marginBottom: 30,
    borderRadius: layout.gutter,
    paddingHorizontal: layout.gutter,
    paddingVertical: layout.gutter * 2,
    backgroundColor: palette.postBackground,
  },
  commentContainer: {
    backgroundColor: palette.transparent,
  },
  commentBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: hexToRgba(palette.text, 0.3),
  },
  commentDistance: {
    paddingVertical: layout.gutter,
    marginBottom: layout.gutter / 2,
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
  description: {
    lineHeight: 22,
    color: palette.text,
    fontSize: fonts.size.xxlg / 2,
    paddingVertical: layout.gutter,
  },
  allIcons: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  postIcons: {
    marginRight: 5,
  },
  messageIcon: {
    marginLeft: layout.gutter * 1.5,
  },
  iconText: {
    color: palette.grey,
    fontSize: fonts.size.s,
  },
  share: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
}));
