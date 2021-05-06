import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
} from "react-native";

// GRAPHQL
import { useQuery } from "react-apollo";
import { MEDIA_OVERVIEW } from "../services/media";
import Loading from "./Loading";

// VARIABLES
const regex = /(<([^>]+)>)/gi;
const SPACING = 8;

function Overview(props) {
  // GRAPHQL
  const { loading, error, data } = useQuery(MEDIA_OVERVIEW, {
    variables: { id: props.mediaId },
    suspend: false,
  });

  useEffect(() => {}, [data]);

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.relation,
          { backgroundColor: props.theme.PRIMARY_BUTTON_COLOR },
        ]}
      >
        <Image
          style={styles.relationCoverImage}
          source={{ uri: item.node.coverImage.large }}
        />
        <View style={styles.relationDetails}>
          <Text
            style={[
              styles.relationType,
              { color: props.theme.SELECTED_ITEM_COLOR },
            ]}
          >
            {item.relationType}
          </Text>
          <Text
            style={[
              styles.relationTitle,
              { color: props.theme.PRIMARY_TEXT_COLOR },
            ]}
          >
            {item.node.title.userPreferred}
          </Text>
          <Text
            style={[
              styles.relationOthers,
              { color: props.theme.PRIMARY_TEXT_COLOR },
            ]}
          >
            {item.node.format + " · " + item.node.status}
          </Text>
        </View>
      </View>
    );
  };

  const renderItemCharacters = ({ item }) => {
    return (
      <View
        style={[
          styles.character,
          { backgroundColor: props.theme.PRIMARY_BUTTON_COLOR },
        ]}
      >
        <Image
          style={styles.characterCoverImage}
          source={{ uri: item.node.image.large }}
        />
        <View style={styles.characterDetails}>
          <Text
            style={[
              styles.characterDetailsName,
              { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
            ]}
          >
            {item.node.name.full}
          </Text>
          <Text
            style={[
              styles.characterDetailsOthers,
              { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
            ]}
          >
            {item.role}
          </Text>
        </View>
        <View style={styles.characterDetails}>
          <Text
            style={[
              styles.characterDetailsName,
              { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
            ]}
          >
            {item?.voiceActors[0]?.name?.full}
          </Text>
          <Text
            style={[
              styles.characterDetailsOthers,
              { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
            ]}
          >
            {item?.voiceActors[0]?.language}
          </Text>
        </View>
        <Image
          style={styles.characterSeiyuuImage}
          source={{ uri: item?.voiceActors[0]?.image?.large }}
        />
      </View>
    );
  };

  const renderItemStaff = ({ item }) => {
    return (
      <View
        style={[
          styles.staff,
          { backgroundColor: props.theme.PRIMARY_BUTTON_COLOR },
        ]}
      >
        <Image
          style={styles.characterCoverImage}
          source={{ uri: item.node.image.large }}
        />
        <View style={styles.characterDetails}>
          <Text
            style={[
              styles.characterDetailsName,
              { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
            ]}
          >
            {item.node.name.full}
          </Text>
          <Text
            style={[
              styles.characterDetailsOthers,
              { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
            ]}
          >
            {item.role}
          </Text>
        </View>
      </View>
    );
  };

  const renderItemRecommendations = ({ item }) => {
    return (
      <View style={styles.recommendation}>
        <Image
          style={styles.recommendationCoverImage}
          source={{ uri: item.node.image.large }}
        />
        <View style={styles.recommendationDetails}>
          <Text
            style={[
              styles.characterDetailsName,
              { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
            ]}
          >
            {item.node.name.full}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* GENRES */}
      <View style={styles.genres}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.Media.genres.map((genre) => (
            <View
              style={[
                styles.genre,
                { backgroundColor: data.Media.coverImage.color },
              ]}
            >
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* DETAILS */}
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
              {data.Media?.format}
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
              {data.Media?.episodes}
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
              {data.Media?.duration + " minutes"}
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
              {data.Media?.status?.toLowerCase()}
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
              {data.Media?.startDate?.day +
                "/" +
                data.Media?.startDate?.month +
                "/" +
                data.Media?.startDate?.year}
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
              {data.Media?.endDate?.day +
                "/" +
                data.Media?.endDate?.month +
                "/" +
                data.Media?.endDate?.year}
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
              {data.Media?.season?.toLowerCase()}
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
              {data.Media?.studios?.edges[0]?.node?.name}
            </Text>
          </View>
        </ScrollView>
      </View>

      {/* DESCRIPTION */}
      <View style={styles.description}>
        <Text
          style={[
            styles.contentTitle,
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
          {data.Media.description.replace(regex, "")}
        </Text>
      </View>

      {/* RELATIONs */}
      <Text
        style={[
          styles.contentTitle,
          { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
        ]}
      >
        Relations
      </Text>
      <View style={styles.relations}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data.Media.relations.edges}
          renderItem={renderItem}
        />
      </View>

      {/* CHARACTERS */}
      <Text
        style={[
          styles.contentTitle,
          { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
        ]}
      >
        Characters
      </Text>
      <View style={styles.characters}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.Media.characterPreview.edges}
          renderItem={renderItemCharacters}
        />
      </View>

      {/* STAFF */}
      <Text
        style={[
          styles.contentTitle,
          { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
        ]}
      >
        Staff
      </Text>
      <View style={styles.characters}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={data.Media.staffPreview.edges}
          renderItem={renderItemStaff}
        />
      </View>

      {/* RECOMMENDATIONS */}
      <Text
        style={[
          styles.contentTitle,
          { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
        ]}
      >
        Recommendations
      </Text>
      <View style={styles.characters}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data.Media.staffPreview.edges}
          renderItem={renderItemRecommendations}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // CONTENT
  contentTitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },

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
  descriptionText: {
    padding: SPACING * 2 + 4,
    borderRadius: 4,
    fontSize: 14,
  },

  // RELATIONS
  relations: { marginBottom: SPACING * 4 - 2 },
  relation: {
    flexDirection: "row",
    marginRight: SPACING * 3 + 1,
    minWidth: 300,
    maxWidth: 300,
    borderRadius: 3,
  },
  relationCoverImage: {
    width: 80,
    height: undefined,
    aspectRatio: 85 / 115,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  relationDetails: {
    padding: SPACING + 4,
    justifyContent: "space-between",
    flexShrink: 1,
  },
  relationType: { textTransform: "capitalize" },
  relationTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  relationOthers: { textTransform: "capitalize" },

  // CHARACTERS
  characters: { marginBottom: SPACING * 4 - 2 },
  character: {
    flexDirection: "row",
    height: 85,
    borderRadius: 3,
    marginBottom: SPACING * 3 - 2,
    justifyContent: "space-between",
  },
  characterCoverImage: {
    width: undefined,
    height: undefined,
    aspectRatio: 60 / 82,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  characterSeiyuuImage: {
    width: undefined,
    height: undefined,
    aspectRatio: 60 / 82,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  characterDetails: {
    padding: SPACING,
    justifyContent: "space-between",
    flexShrink: 1,
  },
  characterDetailsName: {
    fontSize: 13,
    fontWeight: "bold",
  },
  characterDetailsOthers: {
    fontSize: 10,
    textTransform: "capitalize",
  },

  // STAFF
  staff: {
    flexDirection: "row",
    height: 75,
    borderRadius: 3,
    marginBottom: SPACING * 3 - 2,
    minWidth: "50%",
    maxWidth: "50%",
    marginRight: "5%",
    // maxWidth: 150,
  },

  // RECOMMENDATIONS
  recommendation: {
    flexDirection: "column",
    marginRight: 20,
  },
  recommendationCoverImage: {
    width: 100,
    height: undefined,
    aspectRatio: 130 / 180,
    borderRadius: 4,
  },
  recommendationDetails: {
    paddingTop: SPACING - 2,
    flexShrink: 1,
  },
});

export default Overview;
