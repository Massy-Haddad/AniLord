import React from "react";
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

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.PRIMARY_BUTTON_COLOR },
        ]}
      >
        {console.log(item)}

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
        <View
          style={[
            styles.content,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          <View style={styles.genres}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {item.genres.map((genre) => (
                <View
                  style={[
                    styles.genre,
                    { backgroundColor: item.coverImage.color },
                  ]}
                >
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.details}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sections.map((section) => (
              <TouchableOpacity style={styles.detail}>
                <Text
                  style={[
                    styles.detailText,
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
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    padding: SPACING + 2,
    justifyContent: "center",
  },
  sectionText: {
    textAlign: "center",
    fontSize: 16,
  },

  // CONTENT
  content: {
    paddingTop: SPACING * 3,
    paddingLeft: 20,
    paddingRight: 20,
  },

  // GENRES
  genres: {
    padding: SPACING,
    alignItems: "center",
  },
  genre: {
    height: SPACING * 3,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: SPACING / 2,
    borderRadius: 50,
  },
  genreText: {
    fontWeight: "bold",
    color: "#ffffff",
    padding: 6,
  },

  // DETAILS
  details: {
    alignContent:"center",
    margin: 25,
    paddingBottom: 18,
  },
  detail: {
    padding: SPACING + 2,
    justifyContent: "center",
  },
  detailText: {
    textAlign: "center",
    fontSize: 16,
  },

  // OTHERS
  close: {
    position: "absolute",
    top: StatusBar.currentHeight,
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

{
  /*       
          <SharedElement id={`item.${item.id}.title`}>
            <Text
              style={{
                color: theme.PRIMARY_TEXT_COLOR,
                fontSize: 24,
                fontWeight: "bold",
                lineHeight: 28,
                marginVertical: 24,
              }}
                >
                  {item.title.userPreferred}
            </Text>
          </SharedElement>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              paddingHorizontal: 12,
              borderRadius: 50,
              alignItems: "center",
            }}
          >
            {item.genres.map((genre) => (
              <View
                style={{
                  backgroundColor: item.coverImage.color,
                  borderRadius: 50,
                  alignItems: "center",
                  marginHorizontal: 6,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", color: "#ffffff", padding: 6 }}
                >
                  {genre}
                </Text>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: "row", paddingHorizontal: 12 }}>
            <View style={{ flexDirection: "column", paddingLeft: 6 }}>
              <Text
                style={{
                  color: theme.SECONDARY_TEXT_COLOR,
                  fontSize: 16,
                  fontWeight: "bold",
                  lineHeight: 18,
                }}
              >
                {item.description}
              </Text>
            </View>
          </View> 
*/
}
