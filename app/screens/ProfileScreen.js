import React from "react";
import { View, Text, FlatList } from "react-native";

// THEME
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeActions";
import { lightTheme, darkTheme } from "../../Theme";

// GRAPHQL

// VARIABLES

function ProfileScreen({ ...props }) {
  // THEME
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  // GRAPHQL

  // MAIN
  return (
    <ThemeProvider theme={theme}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
        }}
      >
        <Text>Profile page, in work</Text>
      </View>
    </ThemeProvider>
  );
}

export default ProfileScreen;
