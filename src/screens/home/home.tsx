import React from "react";
import { Text, View, Image, ScrollView } from "react-native";

import { Post } from "../../component/post";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../types/navigation";

export const HomeScreen: React.FC<RootTabScreenProps<"Home">> = ({
  navigation,
}) => {
  const { styles } = useStyles();
  const handlePress = () => navigation.replace("Comments");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          <View style={styles.profileWrapper}>
            <Image
              style={styles.image}
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&dl=michael-dam-mEZ3PoFGs_k-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
              }}
            />
            <Text style={styles.profileName}>Bonjour, Amakiri</Text>
            <Text style={styles.email}>@amakirij</Text>
          </View>
          <View style={styles.profileCounter}>
            <View style={styles.counter}>
              <Text style={styles.post}>0032</Text>
              <Text style={styles.postTag}>Posts</Text>
            </View>
            <View style={styles.counter}>
              <Text style={styles.post}>026354</Text>
              <Text style={styles.postTag}>Followers</Text>
            </View>
            <View style={styles.counter}>
              <Text style={styles.post}>0534</Text>
              <Text style={styles.postTag}>Subscriptions</Text>
            </View>
          </View>

          <View style={styles.allPost}>
            <Text style={styles.posts}>Post</Text>
            <Text style={styles.sortings}>Sorting</Text>
          </View>
          <Post onPress={handlePress} />
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
  contentContainer: {
    paddingTop: layout.gutter,
    paddingBottom: edgeInsets.bottom,
    paddingHorizontal: layout.gutter,
  },
  profile: {},
  profileWrapper: {
    alignItems: "center",
  },
  image: {
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
  },
  counter: {},
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
    color: palette.outline,
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
}));
