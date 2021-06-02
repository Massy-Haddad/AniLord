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

// GRAPHQL
// import SearchBar from "../components/SearchBar";
import { useLazyQuery } from "react-apollo";
import { SEARCH_QUERY } from "../services/media";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("screen");
const SPACING = 8;

export default function SearchScreen({ navigation }) {
  // THEME
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [mediaList, setAnimeList] = useState([]);

  // GRAPHQL
  const [getSearch, { data: searchData, loading }] = useLazyQuery(SEARCH_QUERY);

  useEffect(() => {
    if (searchData) {
      setAnimeList(searchData.Page.media);
    }
  }, [mediaList, searchData]);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
        ]}
      >
        {/* Header */}
        <View style={{ marginTop: 32, marginBottom: 8, paddingHorizontal: 8 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: theme.PRIMARY_TEXT_COLOR,
                fontSize: 32,
                fontWeight: "600",
                marginBottom: SPACING * 2,
                marginRight: SPACING,
              }}
            >
              Search
            </Text>

            <Picker
              selectedValue={selectedValue}
              style={{
                height: 50,
                width: 200,
                justifyContent: "center",
                color: theme.PRIMARY_TEXT_COLOR,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
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
              style={[
                styles.searchInput,
                { color: theme.PRIMARY_BUTTON_TEXT_COLOR },
              ]}
              placeholder={"Enter " + selectedValue.toLowerCase() + " name"}
              // placeholder={ searchInput === '' ? "Enter " + selectedValue.toLowerCase() + " name" : searchInput }
              placeholderTextColor={theme.PRIMARY_BUTTON_TEXT_COLOR}
              onChangeText={(text) => setSearchInput(text)}
              returnKeyType="search"
              onSubmitEditing={() =>
                selectedValue === ""
                  ? getSearch({ variables: { search: searchInput } })
                  : getSearch({
                      variables: { search: searchInput, type: selectedValue },
                    })
              }
            ></TextInput>
          </View>
        </View>

        {loading ? (
          <Loading theme={theme} />
        ) : (
          <MediaList
            navigation={navigation}
            theme={theme}
            search={searchInput}
            mediaList={mediaList}
          />
        )}
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
