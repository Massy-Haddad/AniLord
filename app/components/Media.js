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

const { width, height } = Dimensions.get("screen");
const SPACING = 8;

function Media(props) {
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

  const renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.media, styles.mediaInvisible]} />;
    }
    return (
      <View style={styles.media}>
        <Image
          style={styles.mediaCover}
          source={{ uri: item.coverImage.extraLarge }}
        />
        <Text
          style={[
            styles.mediaText,
            { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
          ]}
        >
          {item.title.userPreferred}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={formatData(props.mediaList, numColumns)}
      style={styles.container}
      renderItem={renderItem}
      numColumns={numColumns}
      key={numColumns}
    />
  );
}

const styles = StyleSheet.create({
  media: {
    flex: 1,
    margin: SPACING,
    // padding: SPACING,
    // backgroundColor: "white",
  },
  mediaCover: {
    borderRadius: 8,
    alignSelf: "center",
    width: undefined,
    height: width * 0.4,
    aspectRatio: 60 / 82,
    marginBottom: SPACING,
  },
  mediaText: {
    fontSize: 12,
  },
  mediaInvisible: {
    backgroundColor: "transparent",
  },
});

export default Media;
