import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// TRANSITIONS
import * as Animatable from "react-native-animatable";
import { SharedElement } from "react-navigation-shared-element";

// THEME
import { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Overview from "../components/Overview";

// NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import DetailScreenTab from "../navigation/DetailScreenTab";

const SPACING = 8;
const sections = [
  "Overview",
  "Characters",
  "Staff",
  "Reviews",
  "Stats",
  "Social",
];

const DetailScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const theme = useSelector((state) => state.themeReducer.theme);

  const [trending, setTrending] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.PRIMARY_BUTTON_COLOR },
        ]}
      >
        {console.log(item)}
        {console.log(Object.keys(item))}
        {/* {console.log(Object.values(item))} */}

        {/* CLOSE */}
        <MaterialCommunityIcons
          name="close"
          size={28}
          color="#ffffff"
          style={styles.close}
          onPress={() => {
            navigation.goBack();
          }}
        />

        {/* HEADER */}
        <Image
          source={{ uri: item.bannerImage }}
          style={[StyleSheet.absoluteFillObject, styles.bannerImage]}
        />
        <View style={styles.header}>
          <SharedElement id={`item.${item.id}.image_url`}>
            <Image
              source={{ uri: item.coverImage.extraLarge }}
              style={styles.coverImage}
              resizeMode="cover"
            />
          </SharedElement>

          <TouchableOpacity style={styles.headerButtonStatus}>
            <Text style={styles.headerButtonStatusText}>Watching</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerButtonFavorite}>
            <MaterialCommunityIcons name="heart" size={25} color="#ffaebc" />
          </TouchableOpacity>
        </View>

        <View style={styles.headerSections}>
          <SharedElement id={`item.${item.id}.title`}>
            <Text
              style={[styles.headerTitle, { color: theme.PRIMARY_TEXT_COLOR }]}
            >
              {item.title.userPreferred}
            </Text>
          </SharedElement>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sections.map((section) => (
              <TouchableOpacity style={styles.section}>
                <Text
                  style={[
                    styles.sectionText,
                    {
                      color:
                        section === "Overview"
                          ? theme.SELECTED_ITEM_COLOR
                          : theme.SECONDARY_TEXT_COLOR,
                    },
                  ]}
                >
                  {section}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* OVERVIEW */}
        {/* <NavigationContainer independent={true}>
          <DetailScreenTab screenProps={{ theme: theme }} />
        </NavigationContainer> */}

        <View
          style={[
            styles.content,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          {<Overview item={item} theme={theme} />}
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  // MAIN VIEW
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  bannerImage: {
    height: 200,
    resizeMode: "cover",
  },

  // HEADER
  header: {
    flexDirection: "row",
    marginTop: SPACING * 8,
    justifyContent: "space-evenly",
    textShadowRadius: 8,
    textShadowOffset: { width: -1, height: 1 },
  },
  coverImage: {
    borderRadius: 5,
    width: 115,
    height: undefined,
    aspectRatio: 460 / 650,
  },
  headerButtonStatus: {
    borderRadius: 5,
    textAlign: "center",
    alignSelf: "flex-end",
    padding: SPACING,
    height: 40,
    width: "40%",
    backgroundColor: "#3db4f2",
  },
  headerButtonStatusText: {
    textAlign: "center",
    color: "#fcfeff",
    fontSize: 16,
  },
  headerButtonFavorite: {
    borderRadius: 5,
    textAlign: "center",
    alignSelf: "flex-end",
    padding: SPACING,
    height: 40,
    width: undefined,
    backgroundColor: "#ec294b",
  },

  // HEADER SECTIONS
  headerSections: {
    margin: SPACING * 2 + 2,
  },
  headerTitle: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    marginTop: SPACING,
    padding: SPACING + 2,
    justifyContent: "center",
  },
  sectionText: {
    textAlign: "center",
    fontSize: 16,
  },

  // CONTENT
  content: {
    flex: 1,
    paddingTop: SPACING * 3,
    paddingLeft: 20,
    paddingRight: 20,
  },

  // OTHERS
  close: {
    position: "absolute",
    top:
      Platform.OS === "ios" ? SPACING * 4 : StatusBar.currentHeight + SPACING,
    right: SPACING * 2,
    zIndex: 2,
    textShadowColor: "black",
    textShadowRadius: 8,
    textShadowOffset: { width: -1, height: 1 },
  },
});

DetailScreen.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.id}.image_url`,
      animation: "move",
      resize: "clip",
    },
    {
      id: `item.${item.id}.title`,
      animation: "fade",
      resize: "clip",
    },
  ];
};

export default DetailScreen;
