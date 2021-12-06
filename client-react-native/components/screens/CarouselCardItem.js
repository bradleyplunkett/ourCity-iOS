import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
} from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({ item, index }) => {
  const { userEmail, setUserEmail } = useState("");

  const handleChange = (text) => {
    setUserEmail(text);
    console.log(text);
  };
  return (
    <View style={styles.container} key={index}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.header}>{item.name}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselCardItem;
