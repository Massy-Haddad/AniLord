import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

// THEME
import { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

function Loading(props) {
  const theme = useSelector((state) => state.themeReducer.theme);

  return (
    <ThemeProvider theme={theme}>
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator
          size="large"
          hidesWhenStopped
          color={theme.PRIMARY_TEXT_COLOR}
        />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
  },
});

export default Loading;
