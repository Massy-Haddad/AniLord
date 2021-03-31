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
import SearchBar from "../components/SearchBar";
import { Picker } from "@react-native-picker/picker";

import { StatusBar } from "expo-status-bar";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { data } from "../config/data";
import { SharedElement } from "react-navigation-shared-element";

import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeActions";
import { lightTheme, darkTheme } from "../../Theme";

import searchBar from "../components/SearchBar";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width / 2;
// const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;

export default function SearchScreen({ navigation }) {
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState("ANIME");
  const [numColumns, setNumColumns] = useState(3);

  const [trending, setTrending] = useState([]);
  const [season, setSeason] = useState([]);
  const [nextSeason, setNextSeason] = useState([]);
  const [popular, setPopular] = useState([]);
  const [top, setTop] = useState([]);
  const [variables, setVariables] = useState({
    nextSeason: "SPRING",
    nextYear: 2021,
    season: "WINTER",
    seasonYear: 2021,
    type: "MANGA",
    perPage: 3,
  });

  useEffect(() => {
    getAnimeData();
  }, []);

  var query = `
  query ($season: MediaSeason, $seasonYear: Int, $nextSeason: MediaSeason, $nextYear: Int) {
    trending: Page(page: 1, perPage: 50) {
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
    <ThemeProvider theme={theme}>
      <View
        style={{ flex: 1, backgroundColor: theme.PRIMARY_BACKGROUND_COLOR }}
      >
        {/* StatusBar */}
        <StatusBar
          barStyle={theme.STATUS_BAR_STYLE}
          backgroundColor={theme.PRIMARY_BACKGROUND_COLOR}
        />

        {/* TEST THEME */}
        <MaterialCommunityIcons
          name={numColumns == 2 ? "view-list" : "crop-square"}
          size={28}
          color={theme.PRIMARY_BUTTON_TEXT_COLOR}
          style={{
            position: "absolute",
            top: 50,
            right: 20,
            zIndex: 2,
            //backgroundColor: "lightgrey",
            //borderRadius: 50,
            //padding: 3,
          }}
          onPress={() => {
            numColumns == 2 ? setNumColumns(3) : setNumColumns(2);
          }}
        />

        {/* Header */}
        <View
          style={{ marginTop: 42, marginBottom: 12, paddingHorizontal: 20 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: theme.PRIMARY_TEXT_COLOR,
                fontSize: 32,
                fontWeight: "600",
                marginBottom: 18,
                marginRight: 5,
              }}
            >
              Search
            </Text>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: 150, justifyContent: "center" }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
              itemStyle={{
                color: theme.PRIMARY_BUTTON_TEXT_COLOR,
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
              }}
              mode="dropdown"
              pickerStyleType={{}}
            >
              <Picker.Item label="ANIME" value="ANIME" />
              <Picker.Item label="MANGA" value="MANGA" />
            </Picker>
          </View>
          <SearchBar />
        </View>

        {/* Flatlist content */}
        <FlatList
          data={formatData(trending, numColumns)}
          style={styles.container}
          renderItem={renderItem}
          numColumns={numColumns}
          key={numColumns}
        />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  item: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 12,
    height: ITEM_HEIGHT * 0.9,
    width: ITEM_WIDTH,
    borderRadius: 8,
  },
});
