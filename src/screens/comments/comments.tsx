import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootTabScreenProps } from "../../types/navigation";

export const CommentsScreen: React.FC<RootTabScreenProps<"Comments">> = () => {
  return (
    <View>
      <Text>post</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
