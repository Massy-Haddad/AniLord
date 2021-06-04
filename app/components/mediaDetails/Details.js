import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

// GRAPHQL
import { useQuery } from "react-apollo";

// COMPONENTS
import Loading from "../Loading";
import { MEDIA_GENERAL_INFORMATIONS } from "../../services/media";

// VARIABLES
const SPACING = 8;

function Details(props) {
  const [refreshing, setRefreshing] = useState(false);

  // GRAPHQL
  const { loading, error, data, refetch } = useQuery(
    MEDIA_GENERAL_INFORMATIONS,
    {
      variables: { id: props.mediaId, type: props.mediaType },
      suspend: false,
    }
  );

  useEffect(() => {}, [loading, error, data, refetch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.content}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  // CONTENT
  content: {
    flex: 1,
    paddingBottom: SPACING * 3,
  },

  // DETAILS
  details: {
    padding: SPACING * 2 + 2,
    // marginBottom: SPACING,
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
});

export default Details;
