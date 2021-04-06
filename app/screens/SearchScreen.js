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
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";

// THEME
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeActions";
import { lightTheme, darkTheme } from "../../Theme";

// GRAPHQL
// import SearchBar from "../components/SearchBar";
import { useQuery, useLazyQuery } from "react-apollo";
import { SEARCH_QUERY } from "../services/media";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH_2 = width / 2;
const ITEM_WIDTH_3 = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH_2 * 0.8;

export default function SearchScreen({ navigation }) {
  // THEME
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  const [animeList, setAnimeList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("ANIME");
  const [numColumns, setNumColumns] = useState(3);
  const [searchInput, setSearchInput] = useState("demon slayer");

  // GRAPHQL
  const [getSearch, { data, loading }] = useLazyQuery(SEARCH_QUERY);

  useEffect(() => {
    if (data && data.Page.media) {
      setAnimeList(data.Page.media);
    }
  }, [animeList, data]);

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
        style={[
          styles.item,
          { height: numColumns == 2 ? ITEM_HEIGHT * 1.5 : ITEM_HEIGHT * 0.9 },
        ]}
        source={{ uri: item.coverImage.extraLarge }}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
          paddingBottom: 100,
        }}
      >
        {/* LIST SIZE */}
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
              style={{
                height: 50,
                width: 160,
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
          <Animatable.View
            animation="slideInDown"
            iterationCount="infinite"
            direction="alternate"
            style={{ alignSelf: "center", paddingTop: height * 0.2 }}
          >
            <MaterialCommunityIcons
              name="panda"
              size={80}
              color={theme.PRIMARY_BUTTON_TEXT_COLOR}
              style={
                {
                  //backgroundColor: "lightgrey",
                  //borderRadius: 50,
                  //padding: 3,
                }
              }
            />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: theme.PRIMARY_BUTTON_TEXT_COLOR,
              }}
            >
              L O A D I N G
            </Text>
          </Animatable.View>
        ) : (
          <FlatList
            data={formatData(animeList, numColumns)}
            style={styles.container}
            renderItem={renderItem}
            numColumns={numColumns}
            key={numColumns}
          />
          // <Text>COUCOU</Text>
        )}
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 12,
    // height: ITEM_HEIGHT * 0.9,
    // width: ITEM_WIDTH,
    borderRadius: 8,
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
    //color: "#2e1408",
    paddingLeft: 32,
  },
  searchInputIcon: {
    position: "absolute",
    left: 8,
    top: 12,
  },
});
