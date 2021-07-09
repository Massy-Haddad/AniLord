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
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SimpleLineIcons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const numColumns = 2;

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
    perPage: 3,
  };

  var query = `
  query ($season: MediaSeason, $seasonYear: Int, $nextSeason: MediaSeason, $nextYear: Int) {
    trending: Page(page: 1, perPage: 6) {
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
    console.log(data.data.trending.media);
    setTrending(data.data.trending.media);
  }

  function handleError(error) {
    alert("Error, check console");
    console.error(error);
  }

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };

  const renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <Image
        style={styles.item}
        source={{ uri: item.coverImage.extraLarge }}
      ></Image>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0f0f0f" }}>
      <StatusBar hidden />
      {/* Header */}
      <View style={{ marginTop: 50, marginBottom: 20, paddingHorizontal: 20 }}>
        <Text style={{ color: "#888", textTransform: "uppercase" }}>
          AniList client
        </Text>
        <Text style={{ color: "#fff", fontSize: 32, fontWeight: "600" }}>
          Discovery
        </Text>
      </View>

      {/* Flatlist content */}
      <FlatList
        data={formatData(trending, numColumns)}
        style={styles.container}
        renderItem={renderItem}
        numColumns={numColumns}
        key={numColumns}
      />
      {/* Scrollable content */}
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <ScrollView
          indicatorStyle="white"
          contentContainerStyle={{ alignItems: "center" }}
        >
          {trending.map((item) => (
            <View key={item.id}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ marginBottom: 14 }}
                onPress={() => navigation.navigate("DetailScreen", { item })}
              >
                <SharedElement id={`item.${item.id}.image_url`}>
                  <Image
                    style={{
                      borderRadius: 14,
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT * 1,
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
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 5,
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
    borderRadius: 8,
  },
});
