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
import { SimpleLineIcons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
import SearchBar from "../components/SearchBar";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

export default function HomeScreen({ navigation }) {
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
    perPage: 10,
  };

  var query = `
  query ($season: MediaSeason, $seasonYear: Int, $nextSeason: MediaSeason, $nextYear: Int, $perPage: Int) {
    trending: Page(page: 1, perPage: $perPage) {
      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    season: Page(page: 1, perPage: 6) {
      media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    nextSeason: Page(page: 1, perPage: 6) {
      media(season: $nextSeason, seasonYear: $nextYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    popular: Page(page: 1, perPage: 6) {
      media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    top: Page(page: 1, perPage: 10) {
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
    studios(isMain: true) {
      edges {
        isMain
        node {
          id
          name
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
    //console.log(data.data.trending.media);
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
      <Animatable.View
        animation="fadeIn"
        duration={2000}
        delay={index * 100}
        //key={item.id.toString()}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginBottom: 14 }}
          onPress={() => navigation.navigate("DetailScreen", { item })}
        >
          <SharedElement id={`item.${item.id}.image_url`}>
            <Image
              style={{
                borderRadius: 14,
                width: ITEM_WIDTH * 0.5,
                height: ITEM_HEIGHT * 0.8,
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
                      fontSize: 22,
                      fontWeight: "bold",
                      lineHeight: 28,
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0f0f0f",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      {/* Status bar */}
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
      {/* Header */}
      <View
        style={{
          marginBottom: 10,
          marginHorizontal: 12,
        }}
      >
        {/*
        <Text style={{ color: "#888", textTransform: "uppercase" }}>
          AniList client
        </Text>
        */}
        <Text style={{ color: "#fff", fontSize: 32, fontWeight: "600" }}>
          Discover
        </Text>
      </View>
      <View style={{ marginRight: 20, marginLeft: 20 }}>
        <SearchBar />
      </View>

      {/* Scrollable content */}
      <View style={{ flex: 1, padding: 20 }}>
        <Text
          style={{
            color: "#888",
            textTransform: "uppercase",
            marginBottom: 12,
            fontSize: 16,
          }}
        >
          Trending now
        </Text>
        <FlatList
          horizontal={true}
          data={trending}
          keyExtractor={(item) => item.id.toString()}
          key={(item) => item.id.toString()}
          renderItem={renderItem}
        />

        <Text
          style={{
            color: "#888",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Upcoming season
        </Text>
        <FlatList
          horizontal={true}
          data={nextSeason}
          keyExtractor={(item) => item.id.toString()}
          key={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}
