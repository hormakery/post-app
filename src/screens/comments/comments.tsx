import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  FlatListProps,
  ActivityIndicator,
} from "react-native";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Post } from "../../component/post";
import { CommentInterface } from "../../types/types";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useComments } from "../../hooks/useComments";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { CommentInput } from "../../component/comment_input";
import { RootTabScreenProps } from "../../types/navigation";
import { NoInternetModal } from "../../component/no_internet_modal";

export const CommentsScreen: React.FC<RootTabScreenProps<"Comments">> = ({
  route,
}) => {
  const post = route.params?.post;
  const y = useSharedValue(0);
  const scrollRef = useRef<FlatList>(null);
  const [inputHeight, setInputHeight] = useState(60);
  const { keyboardHeight, keyboardShown } = useKeyboard();
  const { styles, layout, edgeInsets, palette } = useStyles();
  const { comments, error, isLoading, onRetry, postComment } = useComments(
    post?.id
  );

  const animatedStyle = useAnimatedStyle(() => ({
    paddingTop: keyboardShown ? keyboardHeight : 0,
    transform: [
      {
        translateY: keyboardShown ? -y.value : -(y.value - keyboardHeight),
      },
    ],
  }));

  // start animation here
  const startAnimation = () => {
    y.value = withSpring(keyboardHeight, {
      mass: 0.3,
      stiffness: 70,
    });
  };

  useEffect(() => {
    // only run animation when keyboard is shown
    startAnimation();
  }, [keyboardHeight]);

  const ListEmptyComponent: FlatListProps<CommentInterface>["ListEmptyComponent"] =
    () => {
      if (isLoading) {
        return (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={palette.text} />
          </View>
        );
      }

      if (error) {
        return (
          <View style={styles.loaderContainer}>
            <Text>{error.message}</Text>
          </View>
        );
      }

      return null;
    };

  const ListHeaderComponent: FlatListProps<CommentInterface>["ListHeaderComponent"] =
    () => {
      return (
        <Fragment>
          <Text style={styles.title}>Post</Text>
          {post && <Post hasBottomBorder isComment {...post} />}
          <Text style={styles.noOfComments}>{comments?.length} comments</Text>
        </Fragment>
      );
    };

  const renderItem: FlatListProps<CommentInterface>["renderItem"] = ({
    item,
  }) => <Post isComment {...item} />;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <FlatList
        ref={scrollRef}
        data={comments}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom:
              inputHeight + (layout.gutter + edgeInsets.bottom) * 2,
          },
        ]}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        keyExtractor={(item, index) => index + "" + item.postId.toString()}
      />
      <CommentInput
        onSubmit={postComment}
        inputHeight={inputHeight}
        setInputHeight={setInputHeight}
        style={{
          paddingBottom: keyboardShown
            ? edgeInsets.bottom / 2
            : edgeInsets.bottom,
        }}
      />
      <NoInternetModal isRetrying={isLoading} onRetry={onRetry} />
    </Animated.View>
  );
};

const useStyles = makeUseStyles(({ fonts, palette, edgeInsets, layout }) => ({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  contentContainer: {
    paddingTop: layout.gutter,
    paddingBottom: edgeInsets.bottom,
    paddingHorizontal: layout.gutter,
  },
  title: {
    color: palette.text,
    textAlign: "center",
    fontSize: fonts.size.xxlg,
    fontWeight: fonts.weight.semi,
    marginBottom: layout.gutter * 2,
  },
  noOfComments: {
    color: palette.grey,
    fontSize: fonts.size.md,
    marginLeft: layout.gutter,
    marginBottom: layout.gutter,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.background,
  },
}));
