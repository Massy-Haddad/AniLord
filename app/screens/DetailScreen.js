import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";

const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.5;
const DetailScreen = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f0f0f" }}>
      <ImageBackground
        //source={{ uri: item.bannerImage }}
        style={{
          width: width,
          heigh: height,
        }}
      >
        <SharedElement id={`item.${item.id}.image_url`}>
          <Image
            resizeMode="cover"
            source={{ uri: item.coverImage.extraLarge }}
            style={{
              width: "100%",
              height: ITEM_HEIGHT * 0.8,

              //width: "40%",
              //height: ITEM_HEIGHT * 0.55,
              //borderBottomLeftRadius: 20,
              //borderBottomRightRadius: 20,
              borderRadius: 8,
              marginRight: 12,
              marginTop: 12,
              marginBottom: 12,
              alignSelf: "flex-end",
            }}
            resizeMode="cover"
          />
        </SharedElement>
      </ImageBackground>
      <MaterialCommunityIcons
        name="close"
        size={28}
        color="#fff"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 2,
          //backgroundColor: "lightgrey",
          //borderRadius: 50,
          //padding: 3,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          paddingHorizontal: 12,
          borderRadius: 50,
          alignItems: "center",
        }}
      >
        {item.genres.map((genre) => (
          <View
            style={{
              backgroundColor: item.coverImage.color,
              borderRadius: 50,
              alignItems: "center",
              marginHorizontal: 6,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#ffffff", padding: 6 }}>
              {genre}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: "row", paddingHorizontal: 12 }}>
        <SimpleLineIcons size={40} color="white" name={item.iconName} />
        <View style={{ flexDirection: "column", paddingLeft: 6 }}>
          <SharedElement id={`item.${item.id}.title`}>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                lineHeight: 28,
                marginVertical: 24,
              }}
            >
              {item.title.userPreferred}
            </Text>
          </SharedElement>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              lineHeight: 18,
            }}
          >
            {item.description}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

DetailScreen.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.id}.image_url`,
      animation: "move",
      resize: "clip",
    },
    {
      id: `item.${item.id}.title`,
      animation: "fade",
      resize: "clip",
    },
  ];
};

export default DetailScreen;
