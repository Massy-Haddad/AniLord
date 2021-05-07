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
import { MEDIA_STATS } from "../services/media";

// COMPONENTS
import Loading from "./Loading";

// VARIABLES
const SPACING = 8;

function Stats(props) {
  // GRAPHQL
  const { loading, error, data, refetch } = useQuery(MEDIA_STATS, {
    variables: { id: props.mediaId },
    suspend: false,
  });

  useEffect(() => {}, [loading, error, data, refetch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* STATS */}
      <View style={styles.stats}>
        <Text
          style={{
            fontSize: 60,
            textAlign: "center",
            paddingTop: 24,
            color: "white",
          }}
        >
          STATS
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // STATS
  stats: {},
});

export default Stats;
