import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { TouchableOpacity, Text, View } from "react-native";
import Modal from "react-native-modal";

import { makeUseStyles } from "../../helpers/makeUseStyles";

type NoInternetModalType = {
  isRetrying: boolean;
  onRetry: VoidFunction;
};

export const NoInternetModal: React.FC<NoInternetModalType> = (props) => {
  const { styles } = useStyles();
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  return (
    <Modal style={styles.modal} animationInTiming={600} isVisible={isOffline}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Connection Error</Text>
        <Text style={styles.modalText}>
          Oops! Looks like your device is not connected to the Internet.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={props.onRetry}
          disabled={props.isRetrying}
        >
          <Text style={[styles.modalText, styles.buttonText]}>Try Again </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const useStyles = makeUseStyles(
  ({ isDarkMode, palette, colors, edgeInsets, layout, fonts }) => ({
    modal: {
      margin: 0,
      justifyContent: "flex-end",
    },
    modalContainer: {
      alignItems: "center",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      paddingTop: layout.gutter * 2,
      paddingBottom: edgeInsets.bottom,
      paddingHorizontal: layout.gutter * 1.5,
      backgroundColor: palette.homeBackground,
    },
    modalTitle: {
      color: palette.text,
      fontSize: fonts.size.lg,
      fontWeight: fonts.weight.semi,
    },
    modalText: {
      opacity: 0.7,
      marginTop: 14,
      marginBottom: 10,
      color: palette.text,
      textAlign: "center",
      fontSize: fonts.size.md,
    },
    button: {
      width: "100%",
      marginTop: 10,
      borderRadius: 5,
      alignItems: "center",
      paddingHorizontal: layout.gutter,
      paddingVertical: layout.gutter * 1.7,
      backgroundColor: isDarkMode ? palette.white : palette.text,
    },
    buttonText: {
      marginTop: 0,
      marginBottom: 0,
      fontWeight: fonts.weight.semi,
      color: isDarkMode ? colors.light.text : palette.white,
    },
  })
);
