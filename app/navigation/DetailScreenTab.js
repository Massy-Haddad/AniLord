import * as React from "react";

// UI
import { Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

// NAVIGATION
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

// COMPONENTS
import Overview from "../components/Overview";

// THEME
import { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { lightTheme, darkTheme } from "../../Theme";

const Tab = createMaterialTopTabNavigator();

const DetailScreenTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Overview" component={Overview} />
    </Tab.Navigator>
  );
};

export default DetailScreenTab;
