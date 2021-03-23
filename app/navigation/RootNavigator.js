import * as React from "react";

import { Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createSharedElementStackNavigator();
const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Options!</Text>
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "",
          tabBarIcon: () => (
            <View style={{}}>
              <FontAwesome5 name="home" size={24} color="#CDCCCE" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: "",
          tabBarIcon: () => (
            <View style={{}}>
              <FontAwesome5 name="search" size={24} color="#CDCCCE" />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Tabs">
        <Stack.Screen name="Tabs" component={MyTabs} options={() => options} />

        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={() => options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
