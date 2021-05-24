import React, { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

// GRAPHQL
import { useQuery } from "react-apollo";
import { MEDIA_STATS } from "../services/media";

// COMPONENTS
import Loading from "./Loading";
import Details from "./Details";

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: props.theme.PRIMARY_BACKGROUND_COLOR,
      }}
    >
      {/* DETAILS */}
      {/* <Details
        theme={props.theme}
        mediaId={props.mediaId}
        mediaType={props.mediaType}
      /> */}

      {/* RANKINGS */}
      <View style={styles.stats}>
        <Text
          style={[
            styles.contentTitle,
            { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
          ]}
        >
          Rankings
        </Text>
        {data.Media.rankings.map((ranking) => (
          <View style={styles.rankings}>
            <Text
              style={[
                styles.rankingsText,
                {
                  backgroundColor: props.theme.PRIMARY_BUTTON_COLOR,
                  color: props.theme.PRIMARY_TEXT_COLOR,
                },
              ]}
            >
              #{ranking.rank} {ranking.context}
              {ranking.allTime ? "" : " " + ranking.year}
            </Text>
            <FontAwesome5
              name={ranking.type === "POPULAR" ? "heart" : "star"}
              solid={true}
              color={ranking.type === "POPULAR" ? "#e85d75" : "#d9a95c"}
              size={16}
              style={styles.icons}
            />
          </View>
        ))}

        {/* STATUS DISTRIBUTION */}
        <Text
          style={[
            styles.contentTitle,
            { color: props.theme.PRIMARY_BUTTON_TEXT_COLOR },
          ]}
        >
          Rankings
        </Text>
        <View style={styles.statusDistributions}>
          {data.Media.distribution.status.map((status) =>
            status.status !== "DROPPED" ? (
              <View
                style={[
                  styles.statusDistribution,
                  {
                    backgroundColor:
                      status.status === "COMPLETED"
                        ? "#68D639"
                        : status.status === "PLANNING"
                        ? "#02A9FF"
                        : status.status === "CURRENT"
                        ? "#9256F3"
                        : status.status === "PAUSED"
                        ? "#F779A4"
                        : props.theme.PRIMARY_BUTTON_COLOR,
                  },
                ]}
              >
                <Text
                  style={[styles.statusDistributionText, { color: "white" }]}
                >
                  {status.status}
                </Text>
              </View>
            ) : null
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // CONTENT
  content: {},
  contentTitle: {
    marginBottom: SPACING + 2,
    fontSize: 16,
    fontWeight: "bold",
  },

  // STATS
  stats: {
    padding: SPACING * 2 + 2,
    borderRadius: 3,
  },

  rankings: {
    marginBottom: SPACING * 3 - 2,
  },
  rankingsText: {
    padding: SPACING + 4,
    borderRadius: 4,
    fontSize: 14,
    textAlign: "center",
    textTransform: "capitalize",
  },

  statusDistributions: {
    flexDirection: "row",
  },
  statusDistribution: {
    flex: 1,
    borderRadius: 10,
    marginHorizontal: SPACING * 0.25,
    width: "25%",
    justifyContent: "center",
    alignContent: "center",
  },
  statusDistributionText: {
    padding: SPACING - 2,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  status: {},

  Graph: {},

  // ICONS
  icons: { position: "absolute", left: SPACING * 2, top: SPACING + 4 },
});

export default Stats;
