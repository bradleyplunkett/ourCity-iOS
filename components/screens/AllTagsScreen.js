import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Button,
  ScrollView,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { getAllTagsScreenStatus } from "../../redux/allTagsScreenStatus";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.38);

const AllTagsScreen = (props) => {
  // Hooks
  const dispatch = useDispatch();
  const isCarousel = useRef(null);

  // Redux store
  const userTags = useSelector((state) => state.tags);
  const tagsStatus = useSelector((state) => state.allTagsScreenStatus);

  const Separator = () => <View style={styles.separator} />;

  const CarouselCardItem = ({ index, item }) => {
    return (
      <ScrollView style={styles.container} key={item.id}>
        <View>
          <Text style={styles.header}>All Places:</Text>
        </View>
        <Separator />
        <View>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          {/*This images should come from the Google API places */}
        </View>
        <Separator />
        <View>
          <Text style={styles.tagName}>{item.name}</Text>
        </View>
        <Separator />
        <View>
          <Text style={styles.tagAddy}>{item.address}</Text>
        </View>
        <Separator />
        <View>
          <Text style={styles.tagAddy}>{item.phoneNumber}</Text>
        </View>
        <Separator />
        {/* <View>
          <Button
            style={styles.body}
            color={"rgb(31, 126, 160)"}
            title='See Comments'
            onPress={() => handlePressComments(item.id)}
          />
        </View>
        <Separator /> */}
        <View>
          <Button
            style={styles.closeButton}
            color={"red"}
            title='Close'
            onPress={handlePressClose}
          />
        </View>
      </ScrollView>
    );
  };
  const handlePressClose = () => {
    dispatch(getAllTagsScreenStatus(tagsStatus)); // Changes the tagView status
  };

  const handlePressComments = (tagId) => {
    // Will have to build an individual component to display the comments
    // dispatch(getStatus(groupStatus));
  };

  const onCarouselItemChange = (index) => {
    let location = userTags[index];
    props.mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <View>
      <Carousel
        layout='tinder'
        layoutCardOffset={30}
        ref={isCarousel}
        data={userTags}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={(index) => onCarouselItemChange(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "black",

    borderRadius: 8,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
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
    height: 125,
  },
  header: {
    color: "#222",
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },
  tagName: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center",
  },
  closeButton: {
    color: "#9B2F2F",
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tagAddy: {
    color: "#222",
    fontSize: 15,

    alignSelf: "center",
  },
});

export default AllTagsScreen;
