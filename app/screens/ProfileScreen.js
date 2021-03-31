import React from "react";
import { View, Text, FlatList, Image, ImageBackground } from "react-native";

// THEME
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeActions";
import { lightTheme, darkTheme } from "../../Theme";

// GRAPHQL
import { graphql, useQuery } from "react-apollo";
import gql from "graphql-tag";

// VARIABLES
const searchQuery = gql`
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

function ProfileScreen({ navigation }) {
  // THEME
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  // GRAPHQL
  const { loading, error, data } = useQuery(searchQuery, {
    variables: { userName: "Waghzen", type: "MANGA" },
  });
  console.log(data.MediaListCollection.user);

  // MAIN
  return (
    <ThemeProvider theme={theme}>
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
          paddingTop: 40,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            color: theme.PRIMARY_BUTTON_TEXT_COLOR,
            marginBottom: 12,
          }}
        >
          {data.MediaListCollection.user.name}
        </Text>
        <Image
          style={{ width: 130, height: 130 }}
          source={{ uri: data.MediaListCollection.user.avatar.large }}
        />
        <ImageBackground
          style={{ width: `100%`, height: `40`, aspectRatio: 1 }}
          source={{ uri: data.MediaListCollection.user.bannerImage }}
        />
      </View>
    </ThemeProvider>
  );
}
export default graphql(searchQuery)(ProfileScreen);
