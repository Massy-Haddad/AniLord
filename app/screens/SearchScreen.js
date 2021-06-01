import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";

// THEME
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeActions";
import { lightTheme, darkTheme } from "../../Theme";

// COMPONENTS
import MediaList from "../components/MediaList";

// GRAPHQL
// import SearchBar from "../components/SearchBar";
import { useQuery, useLazyQuery } from "react-apollo";
import { SEARCH_QUERY } from "../services/media";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("screen");

export default function SearchScreen({ navigation }) {
  // THEME
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [mediaList, setAnimeList] = useState([]);

  const [isGallery, setIsGallery] = useState(true);

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
        style={{
          flex: 1,
          backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
          paddingBottom: 120,
        }}
      >
        {/* Header */}
        <View style={{ marginTop: 32, marginBottom: 8, paddingHorizontal: 8 }}>
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
  container: {
    flex: 1,
    margin: 10,
  },
  itemInvisible: {
    backgroundColor: "transparent",
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
