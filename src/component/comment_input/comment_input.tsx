import React, { useState } from "react";
import { View, TextInput, ViewProps, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { makeUseStyles } from "../../helpers/makeUseStyles";

type CommentInputProps = {
  inputHeight: number;
  style?: ViewProps["style"];
  onSubmit: (text: string) => void;
  setInputHeight: (height: number) => void;
};

export const CommentInput: React.FC<CommentInputProps> = (props) => {
  const { styles, palette } = useStyles();
  const [text, onChangeText] = useState("");

  const handleSubmit = () => {
    props.onSubmit(text);
    onChangeText("");
  };

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.chatFooter}>
        <TextInput
          value={text}
          multiline
          style={[styles.input, { height: props.inputHeight }]}
          onChangeText={onChangeText}
          placeholder="write a comment..."
          placeholderTextColor={palette.text}
          onContentSizeChange={({ nativeEvent }) =>
            props.setInputHeight(nativeEvent.contentSize.height)
          }
        />
        <MaterialCommunityIcons
          size={30}
          name="attachment"
          color={palette.text}
          style={styles.footerIcon}
        />
      </View>
      <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
        <MaterialCommunityIcons
          size={30}
          name="arrow-up"
          color={palette.background}
        />
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeUseStyles(
  ({ isDarkMode, palette, edgeInsets, layout, fonts }) => ({
    container: {
      bottom: 0,
      flexDirection: "row",
      position: "absolute",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: layout.gutter,
    },
    chatFooter: {
      flex: 1,
      minHeight: 60,
      maxHeight: 100,
      borderRadius: 30,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: layout.gutter,
      backgroundColor: isDarkMode ? palette.grey : palette.listBackground,
    },
    input: {
      flex: 1,
      minHeight: 60,
      maxHeight: 100,
      color: palette.text,
      fontSize: fonts.size.md,
      marginLeft: layout.gutter,
      paddingRight: layout.gutter,
      paddingTop: layout.gutter * 1.6,
    },
    footerIcon: {
      alignItems: "flex-end",
      marginRight: layout.gutter / 2,
      justifyContent: "flex-end",
    },
    sendButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: layout.gutter,
      backgroundColor: isDarkMode ? palette.white : palette.text,
    },
  })
);
