import React, { Fragment } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  FlatListProps,
  ActivityIndicator,
} from "react-native";

import { Post } from "../../component/post";
import { usePosts } from "../../hooks/usePosts";
import { PostInterface } from "../../types/types";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../types/navigation";

export const HomeScreen: React.FC<RootTabScreenProps<"Home">> = ({
  navigation,
}) => {
  const { styles, palette } = useStyles();
  const { isLoading, error, posts } = usePosts();

  const handlePress = (post: PostInterface) => {
    navigation.navigate("Comments", { post });
  };

  const ListEmptyComponent: FlatListProps<PostInterface>["ListEmptyComponent"] =
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

  const ListHeaderComponent: FlatListProps<PostInterface>["ListHeaderComponent"] =
    () => {
      return (
        <Fragment>
          <View style={styles.profileWrapper}>
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&dl=michael-dam-mEZ3PoFGs_k-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
              }}
            />
            <Text style={styles.profileName}>Bonjour, Amakiri</Text>
            <Text style={styles.email}>@amakirij</Text>
          </View>
          <View style={styles.profileCounter}>
            <View>
              <Text style={styles.post}>0032</Text>
              <Text style={styles.postTag}>Posts</Text>
            </View>
            <View>
              <Text style={styles.post}>026354</Text>
              <Text style={styles.postTag}>Followers</Text>
            </View>
            <View>
              <Text style={styles.post}>0534</Text>
              <Text style={styles.postTag}>Subscriptions</Text>
            </View>
          </View>
          <View style={styles.allPost}>
            <Text style={styles.posts}>Post</Text>
            <Text style={styles.sortings}>Sorting</Text>
          </View>
        </Fragment>
      );
    };

  const renderItem: FlatListProps<PostInterface>["renderItem"] = ({ item }) => (
    <Post onPress={() => handlePress(item)} {...item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const useStyles = makeUseStyles(({ fonts, palette, edgeInsets, layout }) => ({
  container: {
    flex: 1,
    paddingTop: edgeInsets.top,
    paddingBottom: edgeInsets.bottom,
    backgroundColor: palette.background,
  },
  contentContainer: {
    paddingTop: layout.gutter,
    paddingBottom: edgeInsets.bottom,
    paddingHorizontal: layout.gutter,
  },
  profileWrapper: {
    alignItems: "center",
  },
  profileImage: {
    width: layout.gutter * 4,
    height: layout.gutter * 4,
    borderRadius: layout.gutter * 2,
  },
  profileName: {
    marginTop: 4,
    color: palette.text,
    fontSize: fonts.size.xlg,
    fontWeight: fonts.weight.semi,
  },
  email: {
    marginTop: 6,
    fontSize: fonts.size.s,
    color: palette.outline,
    fontWeight: fonts.weight.thin,
  },
  profileCounter: {
    flexDirection: "row",
    paddingVertical: layout.gutter,
    justifyContent: "space-between",
    paddingHorizontal: layout.gutter,
  },
  post: {
    letterSpacing: 2,
    marginBottom: 5,
    color: palette.primary,
    fontSize: fonts.size.lg,
    fontWeight: fonts.weight.semi,
  },
  postTag: {
    alignSelf: "center",
    fontSize: fonts.size.s,
    color: palette.grey,
  },
  allPost: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: layout.gutter * 2,
  },
  posts: {
    color: palette.text,
    fontSize: fonts.size.xlg,
    fontWeight: fonts.weight.semi,
  },
  sortings: {
    alignItems: "center",
    color: palette.primary,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: layout.screen.height - layout.screen.width,
  },
}));
