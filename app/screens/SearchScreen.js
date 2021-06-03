import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SimpleLineIcons } from "@expo/vector-icons";

// THEME
import { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import MediaList from "../components/MediaList";
import CharacterList from "../components/CharacterList";

// GRAPHQL
// import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import { useLazyQuery } from "react-apollo";
import { SEARCH_QUERY } from "../services/media";
import { CHARACTERS_SEARCH_QUERY } from "../services/character";

const { width, height } = Dimensions.get("screen");
const SPACING = 8;

export default function SearchScreen({ navigation }) {
  // THEME
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [mediaList, setAnimeList] = useState([]);
  const [characterList, setCharacterList] = useState([]);

  // GRAPHQL
  const [getSearchMedia, { data: searchData, loading: mediasLoading }] =
    useLazyQuery(SEARCH_QUERY);

  const [
    getSearchCharacter,
    { data: searchCharacterData, loading: charactersLoading },
  ] = useLazyQuery(CHARACTERS_SEARCH_QUERY);

  useEffect(() => {
    if (searchData && !charactersLoading) setAnimeList(searchData.Page.media);
    if (searchCharacterData && !mediasLoading)
      setCharacterList(searchCharacterData.Page.characters);
  }, [mediaList, searchData, searchCharacterData]);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                styles.headerText,
                {
                  color: theme.PRIMARY_TEXT_COLOR,
                },
              ]}
            >
              Search
            </Text>

            <Picker
              selectedValue={selectedValue}
              style={[
                styles.picker,
                {
                  color: theme.PRIMARY_TEXT_COLOR,
                },
              ]}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue);
                setSearchInput("");
              }}
              itemStyle={{
                color: theme.PRIMARY_BUTTON_TEXT_COLOR,
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
              }}
              mode="dropdown" // enum('dialog', 'dropdown')
              prompt="What are you looking for today?"
              pickerStyleType={{ backgroundColor: "red" }}
            >
              <Picker.Item label="ANIME" value="ANIME" />
              <Picker.Item label="MANGA" value="MANGA" />
              <Picker.Item label="ANIME/MANGA" value="" />
              <Picker.Item label="CHARACTER" value="CHARACTER" />
            </Picker>
          </View>

          {/* SEARCHBAR */}
          <View
            style={[
              styles.searchContainer,
              { backgroundColor: theme.PRIMARY_BUTTON_COLOR },
            ]}
          >
            <SimpleLineIcons
              size={15}
              color={theme.PRIMARY_BUTTON_TEXT_COLOR}
              name="magnifier"
              style={styles.searchInputIcon}
            />
            <TextInput
              style={[styles.searchInput, { color: theme.PRIMARY_TEXT_COLOR }]}
              placeholder={"Enter " + selectedValue.toLowerCase() + " name"}
              placeholderTextColor={theme.PRIMARY_BUTTON_TEXT_COLOR}
              onChangeText={(text) => setSearchInput(text)}
              returnKeyType="search"
              onSubmitEditing={() =>
                selectedValue === "CHARACTER"
                  ? getSearchCharacter({
                      variables: { pageNumber: 1, search: searchInput },
                    })
                  : selectedValue === ""
                  ? getSearchMedia({ variables: { search: searchInput } })
                  : getSearchMedia({
                      variables: { search: searchInput, type: selectedValue },
                    })
              }
            ></TextInput>
          </View>
        </View>

        {(() => {
          switch (selectedValue) {
            case "ANIME":
            case "MANGA":
            case "":
              return mediasLoading ? (
                <Loading theme={theme} />
              ) : (
                <MediaList
                  navigation={navigation}
                  theme={theme}
                  search={searchInput}
                  mediaList={mediaList}
                />
              );
            case "CHARACTER":
              return charactersLoading ? (
                <Loading theme={theme} />
              ) : (
                <CharacterList
                  navigation={navigation}
                  theme={theme}
                  characterList={characterList}
                />
              );
            case "STUDIO":
              return <Text>STUDIO</Text>;
            case "STAFF":
              return <Text>STAFF</Text>;
            default:
              return null;
          }
        })()}
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  // MAIN VIEW
  container: {
    flex: 1,
    paddingBottom: 300,
  },

  header: {
    marginTop: SPACING * 4,
    marginBottom: SPACING,
    paddingHorizontal: SPACING + 2,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: SPACING * 2,
    marginRight: SPACING,
  },

  picker: {
    height: 50,
    width: 200,
    justifyContent: "center",
  },

  searchContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    fontSize: 16,
    paddingLeft: 36,
  },
  searchInputIcon: {
    position: "absolute",
    left: 12,
    top: 12,
  },
});
