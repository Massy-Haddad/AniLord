import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

// THEME
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeActions";
import { lightTheme, darkTheme } from "../../Theme";

// GRAPHQL
import { useQuery } from "react-apollo";
import { PROFILE_QUERY } from "../services/media";

// VARIABLES
const windowHeight = Dimensions.get("window").height;
const ITEM_HEIGHT = windowHeight * 0.26;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const TOP_HEADER_HEIGHT = height * 0.25;

function ProfileScreen({ navigation }) {
  // THEME
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  // GRAPHQL
  const { data, loading, error } = useQuery(PROFILE_QUERY, {
    variables: { userName: "Waghzen", type: "MANGA" },
  });

  if (loading || error) return null;

  {
    /* 
  {console.log(data.MediaListCollection.lists[0].entries[0].id)}
  {console.log(data.MediaListCollection.user.bannerImage)} */
  }

  // MAIN
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
          paddingTop: StatusBar.currentHeight,
        }}
      >
        {/* HEADER */}
        <ImageBackground
          style={[
            StyleSheet.absoluteFillObject,
            {
              height: TOP_HEADER_HEIGHT + 17,
              resizeMode: "cover",
              flexDirection: "row",
            },
          ]}
          source={{ uri: data.MediaListCollection.user.bannerImage }}
        >
          <Image
            style={{
              width: 110,
              height: 110,
              alignSelf: "flex-end",
              marginHorizontal: 12,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
            source={{ uri: data.MediaListCollection.user.avatar.large }}
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Overpass_900Black",
              color: "white" /* theme.PRIMARY_BUTTON_TEXT_COLOR */,
              alignSelf: "flex-end",
              marginVertical: 12,
              textShadowColor: "black",
              textShadowRadius: 12,
              textShadowOffset: { width: -1, height: 1 },
            }}
          >
            {data.MediaListCollection.user.name}
          </Text>
        </ImageBackground>

        {/* BODY */}
        <View
          style={{
            transform: [
              { translateY: TOP_HEADER_HEIGHT + StatusBar.currentHeight },
            ],
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginLeft: 12,
              marginRight: 12,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                alignSelf: "center",
                fontFamily: "Overpass_900Black",
                color: theme.PRIMARY_BUTTON_TEXT_COLOR,
              }}
            >
              COMING SOON..
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}
export default ProfileScreen;
// export default graphql(PROFILE_QUERY)(ProfileScreen);
