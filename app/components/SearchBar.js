import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

function searchBar(props) {
  return (
    <View style={styles.container}>
      <SimpleLineIcons
        size={15}
        color="grey"
        name="magnifier"
        style={styles.searhInputIcon}
      />
      <TextInput placeholder="Search" style={styles.searhInput}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    justifyContent: "center",
  },
  searhInput: {
    width: "100%",
    height: "100%",
    fontSize: 16,
    //color: "#2e1408",
    paddingLeft: 32,
  },
  searhInputIcon: {
    position: "absolute",
    left: 8,
    top: 12,
  },
});

export default searchBar;
