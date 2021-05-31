import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

// COMPONENTS

// VARIABLES
const SPACING = 8;

function Genres(props) {
  return (
    <View style={styles.genres}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.media.genres.map((genre) => (
          <View
            style={[
              styles.genre,
              {
                backgroundColor: props.media.coverImage.color
                  ? props.media?.coverImage?.color
                  : props.theme.PRIMARY_BUTTON_COLOR,
              },
            ]}
          >
            <Text style={styles.genreText}>{genre.toLowerCase()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // GENRES
  genres: {
    alignItems: "center",
  },
  genre: {
    borderRadius: 50,
    height: SPACING * 4,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: SPACING / 2,
  },
  genreText: {
    fontWeight: "bold",
    color: "#ffffff",
    padding: SPACING,
  },
});

export default Genres;
