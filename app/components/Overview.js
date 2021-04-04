import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const SPACING = 8;

function Overview(props) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.genres}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {props.item.genres.map((genre) => (
            <View
              style={[
                styles.genre,
                { backgroundColor: props.item.coverImage.color },
              ]}
            >
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View
        style={[
          styles.details,
          { backgroundColor: props.theme.PRIMARY_BUTTON_COLOR },
        ]}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.detail}>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
              ]}
            >
              Format
            </Text>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_TEXT_COLOR },
              ]}
            >
              {props.item?.format}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
              ]}
            >
              Episodes
            </Text>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_TEXT_COLOR },
              ]}
            >
              {props.item?.episodes}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
              ]}
            >
              Episode duration
            </Text>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_TEXT_COLOR },
              ]}
            >
              {props.item?.duration + " minutes"}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
              ]}
            >
              Status
            </Text>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_TEXT_COLOR },
              ]}
            >
              {props.item?.status?.toLowerCase()}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
              ]}
            >
              Start date
            </Text>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_TEXT_COLOR },
              ]}
            >
              {props.item?.startDate?.day +
                "/" +
                props.item?.startDate?.month +
                "/" +
                props.item?.startDate?.year}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
              ]}
            >
              End date
            </Text>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_TEXT_COLOR },
              ]}
            >
              {props.item?.endDate?.day +
                "/" +
                props.item?.endDate?.month +
                "/" +
                props.item?.endDate?.year}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
              ]}
            >
              Season
            </Text>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_TEXT_COLOR },
              ]}
            >
              {props.item?.season?.toLowerCase()}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
              ]}
            >
              Studio
            </Text>
            <Text
              style={[
                styles.detailText,
                { color: props.theme.PRIMARY_TEXT_COLOR },
              ]}
            >
              {props.item?.studios?.edges[0]?.node?.name}
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.description}>
        <Text
          style={[
            styles.descriptionTitle,
            { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
          ]}
        >
          Description
        </Text>
        <Text
          style={[
            styles.descriptionText,
            {
              backgroundColor: props.theme.PRIMARY_BUTTON_COLOR,
              color: props.theme.PRIMARY_BUTTON_TEXT_COLOR,
            },
          ]}
        >
          {props.item.description}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // GENRES
  genres: {
    marginBottom: SPACING * 2,
    alignItems: "center",
  },
  genre: {
    height: SPACING * 3,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: SPACING / 2,
    borderRadius: 50,
  },
  genreText: {
    fontWeight: "bold",
    color: "#ffffff",
    padding: 6,
  },

  // DETAILS
  details: {
    padding: SPACING * 2 + 2,
    marginBottom: SPACING * 3 + 1,
    borderRadius: 3,
  },
  detail: {
    paddingRight: SPACING * 2 + 2, // was "SPACING * 3"
    alignItems: "flex-start",
  },
  detailText: {
    textAlign: "center",
    fontSize: 16,
  },

  // DESCRIPTION
  description: {
    marginBottom: SPACING * 4 - 2,
  },
  descriptionTitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionText: {
    padding: SPACING * 2 + 4,
    borderRadius: 4,
    fontSize: 14,
  },
});

export default Overview;
