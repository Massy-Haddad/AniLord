import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { FontAwesome5 } from "@expo/vector-icons";
import Genres from "./Genres";

const { width, height } = Dimensions.get("screen");
const regex = /(<([^>]+)>)/gi;
const SPACING = 8;

function Media(props, navigation) {
  const [numColumns, setNumColumns] = useState(1);
  const [mode, setMode] = useState("gallery");

  useEffect(() => {
    console.log(mode);
  }, [props.mediaList, numColumns, mode]);

  // console.log(props.mediaList[0]);

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

  const renderItemGallery = ({ item, index }) => {
    // Reset the number of columns
    setNumColumns(3);

    if (item.empty === true) {
      return <View style={[gallery.media, gallery.mediaInvisible]} />;
    }
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("SearchDetailScreen", { item })
        }
        activeOpacity={0.5}
        style={gallery.media}
      >
        <SharedElement id={`item.${item.id}.image_url`}>
          <Image
            style={[gallery.mediaCover, { width: (width * 0.88) / numColumns }]}
            source={{ uri: item.coverImage.extraLarge }}
          />
        </SharedElement>
        <SharedElement id={`item.${item.id}.title`}>
          <Text
            numberOfLines={2}
            style={[
              gallery.mediaText,
              {
                color: props.theme.PRIMARY_TEXT_COLOR,
              },
            ]}
          >
            {item.coverImage.color ? (
              <FontAwesome5
                name="circle"
                size={10}
                solid={true}
                color={
                  item.coverImage.color
                    ? item.coverImage.color
                    : props.theme.PRIMARY_TEXT_COLOR
                }
                style={{ margin: 10 }}
              />
            ) : null}
            {item.coverImage.color ? " " : null}
            {item.title.userPreferred}
          </Text>
        </SharedElement>
      </TouchableOpacity>
    );
  };

  const renderItemDetailed = ({ item, index }) => {
    // Reset the number of columns
    setNumColumns(1);

    if (item.empty === true) {
      return <View style={[detailed.media, detailed.mediaInvisible]} />;
    }
    return (
      <View
        style={[
          detailed.media,
          {
            width: (width / numColumns) * 0.9,
            backgroundColor: props.theme.PRIMARY_BUTTON_COLOR,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("SearchDetailScreen", { item })
          }
          activeOpacity={0.5}
          style={detailed.mediaCard}
        >
          <SharedElement id={`item.${item.id}.image_url`}>
            <Image
              style={detailed.mediaCover}
              source={{ uri: item.coverImage?.extraLarge }}
            />
          </SharedElement>
          {/* OVERLAY */}
          <View
            style={[
              detailed.mediaOverlay,
              {
                backgroundColor: props.theme.OVERLAY_BACKGROUND_COLOR,
              },
            ]}
          >
            <SharedElement id={`item.${item.id}.title`}>
              <Text numberOfLines={2} style={detailed.mediaTitleText}>
                {item.title?.userPreferred}
              </Text>
            </SharedElement>
            <Text
              style={[
                detailed.mediaStudioText,
                {
                  color: item.coverImage.color
                    ? item.coverImage.color
                    : props.theme.PRIMARY_TEXT_COLOR,
                },
              ]}
            >
              {item.studios?.edges[0]?.node.name}
            </Text>
          </View>
        </TouchableOpacity>

        {/* DETAILS */}
        <View style={detailed.mediaDetails}>
          <View style={detailed.mediaDetailsMain}>
            <View style={detailed.mediaDetailsMainOthers}>
              <Text
                style={
                  ([detailed.mediaDetailsSecondaryText],
                  { color: props.theme.SECONDARY_TEXT_COLOR })
                }
              >
                Ep 9 airing in
              </Text>
              <Text
                style={
                  ([detailed.mediaDetailsSecondaryText],
                  {
                    color: props.theme.PRIMARY_TEXT_COLOR,
                    fontWeight: "bold",
                    fontSize: 18,
                  })
                }
              >
                6 days, 13 mins
              </Text>
              <Text
                style={
                  ([detailed.mediaDetailsSecondaryText],
                  { color: props.theme.SECONDARY_TEXT_COLOR })
                }
              >
                TV Show
              </Text>
            </View>
            <ScrollView style={detailed.mediaDetailsMainDescription}>
              <Text
                style={
                  ([detailed.mediaDetailsSecondaryText],
                  { color: props.theme.PRIMARY_TEXT_COLOR })
                }
              >
                {item.description?.replace(regex, "")}
              </Text>
            </ScrollView>
          </View>
          <View
            style={[
              detailed.mediaDetailsBottom,
              {
                backgroundColor: props.theme.PRIMARY_BACKGROUND_COLOR,
              },
            ]}
          >
            <View style={detailed.mediaDetailsBottomGenres}>
              <Genres theme={props.theme} media={item} />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: item.coverImage.color
                  ? item.coverImage.color
                  : props.theme.PRIMARY_TEXT_COLOR,
                borderRadius: 50,
              }}
            >
              <FontAwesome5
                name="pen"
                size={18}
                solid={true}
                color={props.theme.PRIMARY_BACKGROUND_COLOR}
                style={{ padding: SPACING }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      {/* HEADER */}
      {props.mediaList.length ? (
        <View style={styles.header}>
          <View style={styles.search}>
            <FontAwesome5
              name="tags"
              size={24}
              color={props.theme.PRIMARY_BUTTON_TEXT_COLOR}
            />
            <TouchableOpacity>
              <View style={styles.searchRemove}>
                <Text
                  onPress={() => {}}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={{
                    fontSize: 13,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Change moi soon?{" "}
                  <FontAwesome5
                    name="times-circle"
                    color={props.theme.PRIMARY_TEXT_COLOR}
                  />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.mode}>
            <TouchableOpacity>
              <FontAwesome5
                name="th"
                size={24}
                solid={true}
                color={props.theme.PRIMARY_BUTTON_TEXT_COLOR}
                onPress={() => setMode("gallery")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome5
                name="th-list"
                size={24}
                solid={true}
                color={props.theme.PRIMARY_BUTTON_TEXT_COLOR}
                onPress={() => setMode("detailed")}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {/* MEDIA LIST */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={formatData(props.mediaList, numColumns)}
        renderItem={
          mode === "gallery"
            ? renderItemGallery
            : mode === "detailed"
            ? renderItemDetailed
            : null
        }
        numColumns={numColumns}
        key={numColumns}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // HEADER
  header: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING * 3,
  },
  mode: {
    width: "18%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  search: {
    width: "80%",
    maxWidth: 250,
    flexDirection: "row",
    alignItems: "center",
  },
  searchRemove: {
    height: 25,
    borderRadius: 12,
    paddingHorizontal: SPACING,
    marginLeft: SPACING,
    backgroundColor: "#3db4f2",
    justifyContent: "center",
  },
});

const gallery = StyleSheet.create({
  media: {
    flex: 1,
    margin: SPACING,
    borderRadius: 8,
  },
  mediaCover: {
    alignSelf: "center",
    height: undefined,
    aspectRatio: 110 / 158,
    marginBottom: SPACING,
  },
  mediaText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  mediaInvisible: {
    backgroundColor: "transparent",
  },
});

const detailed = StyleSheet.create({
  // MAIN ITEM CARD
  media: {
    flex: 1,
    borderRadius: 8,
    flexDirection: "row",
    margin: SPACING,
    alignSelf: "center",

    // SHADOWS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  // LEFT SIDE CARD
  mediaCard: {
    width: "45%",
  },
  mediaCover: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: "100%",
    height: undefined,
    aspectRatio: 175 / 265,
    alignSelf: "flex-start",
  },
  mediaOverlay: {
    justifyContent: "space-evenly",
    position: "absolute",
    width: "100%",
    height: "35%",
    bottom: 0,
    padding: SPACING + 2,
    borderBottomLeftRadius: 8,
  },

  // RIGHT SIDE INFORMATIONS
  mediaDetails: {
    flex: 1,
  },
  mediaTitleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
  },
  mediaStudioText: {
    width: "100%",
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  // TOP INFORMATIONS
  mediaDetailsMain: {
    height: "80%",
    alignSelf: "center",
    justifyContent: "space-evenly",
    padding: SPACING * 2,
  },
  mediaDetailsMainOthers: {
    height: "40%",
    justifyContent: "space-between",
    marginBottom: SPACING,
  },
  mediaDetailsMainDescription: {
    maxHeight: 100,
  },

  // BOTTOM INFORMATIONS
  mediaDetailsBottom: {
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomRightRadius: 8,
  },
  mediaDetailsBottomGenres: {
    width: "70%",
    borderRadius: 8,
  },

  // INVISIBLE CARD FOR ALIGNMENT
  mediaInvisible: {
    backgroundColor: "transparent",
  },
});

export default Media;
