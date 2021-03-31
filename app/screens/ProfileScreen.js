import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  Dimensions,
  StyleSheet,
} from "react-native";

// THEME
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeActions";
import { lightTheme, darkTheme } from "../../Theme";

// GRAPHQL
import { graphql, useQuery } from "react-apollo";
import gql from "graphql-tag";

// VARIABLES
const PROFILE_QUERY = gql`
  query($userName: String, $type: MediaType) {
    MediaListCollection(userName: $userName, type: $type) {
      lists {
        name
        isCustomList
        isCompletedList: isSplitCompletedList
        entries {
          ...mediaListEntry
        }
      }
      user {
        id
        name
        avatar {
          large
        }
        bannerImage
        mediaListOptions {
          scoreFormat
          rowOrder
          animeList {
            sectionOrder
            customLists
            splitCompletedSectionByFormat
            theme
          }
          mangaList {
            sectionOrder
            customLists
            splitCompletedSectionByFormat
            theme
          }
        }
      }
    }
  }
  fragment mediaListEntry on MediaList {
    id
    mediaId
    status
    score
    progress
    progressVolumes
    repeat
    priority
    private
    hiddenFromStatusLists
    customLists
    advancedScores
    notes
    updatedAt
    startedAt {
      year
      month
      day
    }
    completedAt {
      year
      month
      day
    }
    media {
      id
      title {
        userPreferred
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
      }
      type
      format
      status(version: 2)
      episodes
      volumes
      chapters
      averageScore
      popularity
      isAdult
      countryOfOrigin
      genres
      bannerImage
      startDate {
        year
        month
        day
      }
    }
  }
`;

const windowHeight = Dimensions.get("window").height;
const ITEM_HEIGHT = windowHeight * 0.26;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const TOP_HEADER_HEIGHT = height * 0.25;

function ProfileScreen({ navigation }) {
  // THEME
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  // GRAPHQL
  const { data, loading, error } = useQuery(PROFILE_QUERY, {
    variables: { userName: "Waghzen", type: "MANGA" },
  });

  if (loading || error) return null;

  {
    /* 
  {console.log(data.MediaListCollection.lists[0].entries[0].id)}
  {console.log(data.MediaListCollection.user.bannerImage)} */
  }

  // MAIN
  return (
    <ThemeProvider theme={theme}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <ImageBackground
          style={[
            StyleSheet.absoluteFillObject,
            {
              height: TOP_HEADER_HEIGHT + 32,
              resizeMode: "cover",
              flexDirection: "row",
            },
          ]}
          source={{ uri: data.MediaListCollection.user.bannerImage }}
        >
          <Image
            style={{
              width: 110,
              height: 110,
              alignSelf: "flex-end",
              marginHorizontal: 12,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
            source={{ uri: data.MediaListCollection.user.avatar.large }}
          />
          <Text
            style={{
              fontSize: 20,
              color: "white" /* theme.PRIMARY_BUTTON_TEXT_COLOR */,
              alignSelf: "flex-end",
              marginVertical: 12,
              textShadowColor: "black",
              textShadowRadius: 12,
              textShadowOffset: { width: -1, height: 1 },
            }}
          >
            {data.MediaListCollection.user.name}
          </Text>
        </ImageBackground>
      </View>
    </ThemeProvider>
  );
}
export default graphql(PROFILE_QUERY)(ProfileScreen);
