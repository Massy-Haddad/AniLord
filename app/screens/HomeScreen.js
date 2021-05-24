import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";

import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeActions";
import { lightTheme, darkTheme } from "../../Theme";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

export default function HomeScreen({ navigation }) {
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  const [trending, setTrending] = useState([]);
  const [season, setSeason] = useState([]);
  const [nextSeason, setNextSeason] = useState([]);
  const [popular, setPopular] = useState([]);
  const [top, setTop] = useState([]);

  useEffect(() => {
    getAnimeData();
  }, []);

  var variables = {
    nextSeason: "SPRING",
    nextYear: 2021,
    season: "WINTER",
    seasonYear: 2021,
    type: "MANGA",
    perPage: 30,
  };

  var query = `
  query ($season: MediaSeason, $seasonYear: Int, $nextSeason: MediaSeason, $nextYear: Int, $perPage: Int) {
    trending: Page(page: 1, perPage: $perPage) {
      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    season: Page(page: 1, perPage: $perPage) {
      media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    nextSeason: Page(page: 1, perPage: $perPage) {
      media(season: $nextSeason, seasonYear: $nextYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    popular: Page(page: 1, perPage: $perPage) {
      media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    top: Page(page: 1, perPage: $perPage) {
      media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
  }
  fragment media on Media {
    id
    title {
      userPreferred
    }
    coverImage {
      extraLarge
      large
      color
    }
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    bannerImage
    season
    description
    type
    format
    status(version: 2)
    episodes
    duration
    chapters
    volumes
    genres
    isAdult
    averageScore
    popularity
    mediaListEntry {
      id
      status
    }
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    relations {
      edges {
        id
        relationType(version: 2)
        node {
          id
          title {
            userPreferred
          }
          format
          type
          status(version: 2)
          bannerImage
          coverImage {
            large
          }
        }
      }
    }
    characterPreview: characters(perPage: 4, sort: [ROLE, ID]) {
      edges {
        id
        role
        voiceActors(language: JAPANESE) {
          id
          name {
            full
          }
          language
          image {
            large
          }
        }
        node {
          id
          name {
            full
          }
          image {
            large
          }
        }
      }
    }
    studios(isMain: true) {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
    staffPreview: staff(perPage: 4, sort: [RELEVANCE, ID]) {
      edges {
        id
        role
        node {
          id
          name {
            full
          }
          language: languageV2
          image {
            large
          }
        }
      }
    }
  }
`;

  const url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  const getAnimeData = async () => {
    fetch(url, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError);
  };

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    setTrending(data.data.trending.media);
    setSeason(data.data.season.media);
    setNextSeason(data.data.nextSeason.media);
    setPopular(data.data.popular.media);
    setTop(data.data.top.media);
  }

  function handleError(error) {
    alert("Error, check console");
    console.error(error);
  }

  const renderItem = ({ item, index }) => {
    return (
      <Animatable.View animation="zoomInUp" duration={900} delay={index * 100}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginBottom: 14 }}
          onPress={() => navigation.navigate("DetailScreen", { item })}
        >
          <SharedElement id={`item.${item.id}.image_url`}>
            <Image
              style={{
                borderRadius: 6,
                width: 125,
                height: undefined,
                aspectRatio: 60 / 82,
                marginHorizontal: 6,
              }}
              source={{ uri: item.coverImage.extraLarge }}
              resizeMode="cover"
            />
          </SharedElement>
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {/*
            <SimpleLineIcons
              size={40}
              color="white"
              name="location-pin"
            />
            */}
              <View style={{ flexDirection: "column", paddingLeft: 6 }}>
                <SharedElement id={`item.${item.id}.title`}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                      // lineHeight: 28,
                      fontFamily: "Overpass_900Black",
                    }}
                  >
                    {item.title.userPreferred}
                  </Text>
                </SharedElement>
                {/*
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  lineHeight: 18,
                }}
              >
                Sort by ...
              </Text>
              */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 80,
            paddingTop: StatusBar.currentHeight,
          }}
        >
          {/* THEME SWITCH */}
          {theme.mode === "light" ? (
            <MaterialCommunityIcons
              name="ghost"
              size={28}
              color={theme.PRIMARY_BUTTON_TEXT_COLOR}
              style={{
                position: "absolute",
                top: 40,
                right: 20,
                zIndex: 2,
                //backgroundColor: "lightgrey",
                //borderRadius: 50,
                //padding: 3,
              }}
              onPress={() => dispatch(switchTheme(darkTheme))}
            />
          ) : (
            <MaterialCommunityIcons
              name="fire"
              size={28}
              color={theme.PRIMARY_BUTTON_TEXT_COLOR}
              style={{
                position: "absolute",
                top: 40,
                right: 20,
                zIndex: 2,
                //backgroundColor: "lightgrey",
                //borderRadius: 50,
                //padding: 3,
              }}
              onPress={() => dispatch(switchTheme(lightTheme))}
            />
          )}
          {/* Header */}
          <View
            style={{
              marginHorizontal: 18,
            }}
          >
            {/*
        <Text style={{ color: "#888", textTransform: "uppercase" }}>
          AniList client
        </Text>
        */}
            <Text
              style={{
                color: theme.PRIMARY_TEXT_COLOR,
                fontSize: 32,
                fontWeight: "600",
              }}
            >
              Discover
            </Text>
          </View>
          {/* <View style={{ marginRight: 20, marginLeft: 20 }}>
          <SearchBar />
        </View> */}

          {/* Scrollable content */}
          <View style={{ flex: 1, padding: 20 }}>
            <Text
              style={{
                color: theme.SECONDARY_TEXT_COLOR,
                textTransform: "uppercase",
                marginBottom: 12,
                fontSize: 16,
              }}
            >
              This season
            </Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={season}
              keyExtractor={(item) => item.id.toString()}
              key={(item) => item.id.toString()}
              renderItem={renderItem}
            />

            <Text
              style={{
                color: theme.SECONDARY_TEXT_COLOR,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Upcoming season
            </Text>
            <FlatList
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={nextSeason}
              keyExtractor={(item) => item.id.toString()}
              key={(item) => item.id.toString()}
              renderItem={renderItem}
            />

            <Text
              style={{
                color: theme.SECONDARY_TEXT_COLOR,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Popular
            </Text>
            <FlatList
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={popular}
              keyExtractor={(item) => item.id.toString()}
              key={(item) => item.id.toString()}
              renderItem={renderItem}
            />

            <Text
              style={{
                color: theme.SECONDARY_TEXT_COLOR,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Trending
            </Text>
            <FlatList
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={trending}
              keyExtractor={(item) => item.id.toString()}
              key={(item) => item.id.toString()}
              renderItem={renderItem}
            />

            <Text
              style={{
                color: theme.SECONDARY_TEXT_COLOR,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Top
            </Text>
            <FlatList
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={top}
              keyExtractor={(item) => item.id.toString()}
              key={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}
