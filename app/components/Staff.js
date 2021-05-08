import React, { useEffect } from "react";
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
import { MEDIA_STAFF } from "../services/media";

// COMPONENTS
import Loading from "./Loading";

// VARIABLES
const SPACING = 8;

function Staff(props) {
  // GRAPHQL
  const { loading, error, data, refetch } = useQuery(MEDIA_STAFF, {
    variables: { id: props.mediaId, page: 1 },
    suspend: false,
  });

  useEffect(() => {}, [loading, error, data, refetch]);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={[
        styles.content,
        { backgroundColor: props.theme.PRIMARY_BACKGROUND_COLOR },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* STAFF */}
        <View style={styles.characters}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={data.Media.staff.edges}
            renderItem={renderItemStaff}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // CONTENT
  content: {
    flex: 1,
    paddingTop: SPACING * 3,
    paddingLeft: 20,
    paddingRight: 20,
  },

  // STAFF
  staff: {
    flexDirection: "row",
    height: 75,
    borderRadius: 3,
    marginBottom: SPACING * 3 - 2,
    minWidth: "48%",
    maxWidth: "48%",
    marginRight: "4%",
  },

  // CHARACTERS
  characters: {
    marginBottom: SPACING * 4 - 2,
  },
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
});

export default Staff;
