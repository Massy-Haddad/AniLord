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
import { MEDIA_CHARACTERS } from "../services/media";

// COMPONENTS
import Loading from "./Loading";

// VARIABLES
const SPACING = 8;

function Characters(props) {
  const [refreshing, setRefreshing] = useState(false);

  // GRAPHQL
  const { loading, error, data, refetch } = useQuery(MEDIA_CHARACTERS, {
    variables: { id: props.mediaId, page: 1, language: "JAPANESE" },
    suspend: false,
  });

  useEffect(() => {}, [loading, error, data, refetch]);

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
            {item.voiceActorRoles[0]?.voiceActor?.name?.full}
          </Text>
          <Text
            style={[
              styles.characterDetailsOthers,
              { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
            ]}
          >
            {item.voiceActorRoles[0]?.voiceActor?.language}
          </Text>
        </View>
        <Image
          style={styles.characterSeiyuuImage}
          source={{ uri: item.voiceActorRoles[0]?.voiceActor?.image?.large }}
        />
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
        {/* CHARACTERS */}
        <View style={styles.characters.edges}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.Media.characters.edges}
            extraData={data}
            renderItem={renderItemCharacters}
            onRefresh={() => refetch}
            refreshing={loading}
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
});

export default Characters;
