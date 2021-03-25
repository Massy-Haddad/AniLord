import * as React from "react";

import { Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import SearchScreen from "../screens/SearchScreen";

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile page, in work</Text>
    </View>
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

const name = "BottomTabs";

const BottomTab = createBottomTabNavigator();

const Stack1 = createSharedElementStackNavigator({
  name,
  debug: true,
});

const Stack2 = createSharedElementStackNavigator({
  name,
  debug: true,
});

const Stack3 = createSharedElementStackNavigator({
  name,
  debug: true,
});

const Home = () => (
  <Stack1.Navigator headerMode="none">
    <Stack1.Screen name={name} component={HomeScreen} />
    <Stack1.Screen
      name="DetailScreen"
      component={DetailScreen}
      options={() => options}
    />
  </Stack1.Navigator>
);

const Search = () => (
  <Stack2.Navigator headerMode="none">
    <Stack2.Screen name={name} component={SearchScreen} />
  </Stack2.Navigator>
);

const Profile = () => (
  <Stack2.Navigator headerMode="none">
    <Stack2.Screen name={name} component={ProfileScreen} />
  </Stack2.Navigator>
);

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            title: "HOME",
            tabBarIcon: () => (
              <FontAwesome5 name="home" size={24} color="#CDCCCE" />
            ),
          }}
        />

        <BottomTab.Screen
          name="Search"
          component={Search}
          options={{
            title: "SEARCH",
            tabBarIcon: () => (
              <FontAwesome5 name="search" size={20} color="#CDCCCE" />
            ),
          }}
        />

        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "PROFILE",
            tabBarIcon: () => (
              <FontAwesome5 name="user-circle" size={24} color="#CDCCCE" />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
