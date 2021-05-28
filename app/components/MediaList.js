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
import { SharedElement } from "react-navigation-shared-element";
import { FontAwesome5 } from "@expo/vector-icons";
import { ceil } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
const SPACING = 8;

function Media(props, navigation) {
  const [numColumns, setNumColumns] = useState(3);

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
    if (item.empty === true) {
      return <View style={[styles.media, styles.mediaInvisible]} />;
    }
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("SearchDetailScreen", { item })
        }
        activeOpacity={0.5}
        style={styles.media}
      >
        <SharedElement id={`item.${item.id}.image_url`}>
          <Image
            style={[styles.mediaCover, { width: (width * 0.88) / numColumns }]}
            source={{ uri: item.coverImage.extraLarge }}
          />
        </SharedElement>
        <SharedElement id={`item.${item.id}.title`}>
          <Text
            numberOfLines={2}
            style={[
              styles.mediaText,
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

  const renderItemDetailed = ({ item, index }) => {};

  return (
    <FlatList
      data={formatData(props.mediaList, numColumns)}
      style={styles.container}
      renderItem={renderItemGallery}
      numColumns={numColumns}
      key={numColumns}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  media: {
    flex: 1,
    margin: SPACING,
    // backgroundColor: "white",
  },
  mediaCover: {
    borderRadius: 8,
    alignSelf: "center",
    height: undefined,
    aspectRatio: 110 / 158,
    marginBottom: SPACING,
  },
  mediaDetails: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  mediaText: {
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  mediaInvisible: {
    backgroundColor: "transparent",
  },
});

export default Media;
