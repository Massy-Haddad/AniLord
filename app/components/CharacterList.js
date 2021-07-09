import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

// COMPONENTS
import Genres from "./mediaDetails/Genres";

const SPACING = 8;
const regex = /(<([^>]+)>)/gi;
const { width, height } = Dimensions.get("screen");

function CharacterList(props) {
  const [numColumns, setNumColumns] = useState(3);

  useEffect(() => { }, [numColumns]);

  // Calculate the number of full rows and set invisible items so the last ones aren't invisible
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
      return <View style={[gallery.media, gallery.mediaInvisible]} />;
    }
    return (
      <Animatable.View
        animation="zoomInUp"
        duration={500}
        delay={index * 50}
        style={gallery.media}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("SearchScreen", { item })}
          activeOpacity={0.5}
        >
          <SharedElement id={`item.${item.id}.image_url`}>
            <Image
              style={[
                gallery.mediaCover,
                { width: (width * 0.85) / numColumns },
              ]}
              source={{ uri: item.image.large }}
              resizeMode="cover"
            />
          </SharedElement>
        </TouchableOpacity>
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
            {item.name?.full}
          </Text>
        </SharedElement>
      </Animatable.View>
    );
  };

  return (
    <View>
      <FlatList
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        data={formatData(props?.characterList, numColumns)}
        key={numColumns}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItemGallery}
      />
    </View>
  );
}

const gallery = StyleSheet.create({
  // CHARACTER
  media: {
    flex: 1,
    margin: SPACING,
  },
  mediaCover: {
    borderRadius: 6,
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

export default CharacterList;
