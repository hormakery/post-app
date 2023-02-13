import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RootTabScreenProps } from "../../types/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import fonts from "../../constants/fonts";
import { Details } from "../../component/details";
import { makeUseStyles } from "../../helpers/makeUseStyles";

export const CommentsScreen: React.FC<RootTabScreenProps<"Comments">> = ({
  navigation,
}) => {
  const { styles, palette } = useStyles();
  const handlePress = () => navigation.replace("Home");
  const [text, onChangeText] = React.useState("");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            style={styles.headerIcon}
            onPress={handlePress}
          />
        </View>
        <Text style={styles.text}>Post</Text>
        <View style={styles.postContainer}>
          {Details.map((items, index) => (
            <View style={styles.commentContainer} key={index}>
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
                  <Text
                    style={{ color: palette.outline, fontSize: fonts.size.s }}
                  >
                    {" "}
                    {items.numberOfMessage}
                  </Text>
                </View>
              </View>
              <Text style={styles.title}>{items.title}</Text>
              <View style={styles.allIcons}>
                <MaterialCommunityIcons
                  name="arrow-up"
                  size={13}
                  style={styles.postIcons}
                  color={palette.checked}
                />
                <Text style={styles.iconText}>{items.options.retweet}</Text>
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
                  style={styles.postIcons}
                />
                <Text style={styles.iconText}>{items.options.inbox}</Text>
              </View>
            </View>
          ))}
          <View style={styles.footer}>
            <View style={styles.chatFooter}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                numberOfLines={4}
                multiline
                autoCorrect={false}
                placeholder="write a comment..."
                keyboardType="default"
              />
              <MaterialCommunityIcons
                name="send"
                size={30}
                color="#fff"
                style={styles.footerIcon}
              />
            </View>
            <TouchableOpacity style={styles.sendButton}>
              <MaterialCommunityIcons name="arrow-up" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const useStyles = makeUseStyles(({ fonts, palette, edgeInsets, layout }) => ({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: edgeInsets.top,
    paddingBottom: edgeInsets.bottom,
    backgroundColor: palette.background,
  },
  text: {
    color: palette.text,
    textAlign: "center",
    fontSize: fonts.size.xxlg,
    fontWeight: fonts.weight.semi,
  },
  contentContainer: {
    paddingTop: layout.gutter,
    paddingBottom: edgeInsets.bottom,
    paddingHorizontal: layout.gutter,
  },
  headerIcon: {
    color: palette.primary,
  },
  postContainer: {
    paddingTop: edgeInsets.top,
  },
  commentContainer: {
    paddingHorizontal: layout.gutter,
    paddingVertical: layout.gutter * 2,
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
  allIcons: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  postIcons: {
    marginLeft: 5,
  },
  iconText: {
    marginLeft: 5,
    color: palette.grey,
    fontSize: fonts.size.s,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatFooter: {
    // width: "100%",
    color: palette.text,
    flexDirection: "row",
    borderRadius: layout.gutter * 2,
    paddingVertical: layout.gutter * 2,
    paddingHorizontal: layout.gutter * 2,
    backgroundColor: palette.hairlineColor,
  },
  input: {},
  footerIcon: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  sendButton: {
    alignItems: "center",
    width: layout.gutter * 4,
    height: layout.gutter * 4,
    backgroundColor: palette.text,
    borderRadius: layout.gutter * 4,
  },
}));
