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
  TouchableWithoutFeedbackBase,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { getTagDetails } from "../../redux/tagDetails";
import { getTagScreenStatus } from "../../redux/tagScreenStatus";
import Comments from "./Comments";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const SLIDER_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.75);

const TagScreen = (props) => {
  // Hooks
  const dispatch = useDispatch();
  const isCarousel = useRef(null);

  // Redux store
  const usersTag = useSelector((state) => state.tagDetails);
  const tagScreenStatus = useSelector((state) => state.tagScreenStatus);
  const groupId = useSelector((state) => state.setGroupIdOnState);
  // const imageFromState = useSelector((state) => state.setPhotoOnStateReducer)

  // let imageFromStateNotJson = JSON.parse(imageFromState)
  // Local State
  const [commentStatus, setCommentStatus] = useState(true);

  //below is a hook called useEffect (similar to component did mount) that gets called when the component initially renders.
  useEffect(() => {
    dispatch(getTagDetails(props.tagId)); // tagId to render
  }, []);

  const Separator = () => <View style={styles.separator} />;

  const CarouselCardItem = ({ index, item }) => {
    return (
      <View style={styles.container} key={item.id}>
        <View>
          <Text style={styles.header}>Place Details:</Text>
        </View>
        <Separator />
        <View>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
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
        <View style={styles.commentSection}>
          {commentStatus ? (
            <Comments tagId={props.tagId} />
          ) : (
            "No comments yet... Perhaps I should go..."
          )}
        </View>
        <Separator />
        <View>
          <Button color={"#9B2F2F"} title='Close' onPress={handlePressClose} />
        </View>
      </View>
    );
  };

  const handlePressClose = () => {
    dispatch(getTagScreenStatus(tagScreenStatus));
  };

  return (
    <View>
      <Carousel
        layout='tinder'
        layoutCardOffset={30}
        ref={isCarousel}
        data={usersTag}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderWidth: 0.5,
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    paddingBottom: 0,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 130,
  },
  tagName: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center",
  },
  commentSection: {
    marginTop: -10,
    flex: 1,
  },
  separator: {
    marginVertical: 0,
    borderBottomColor: "black",
    borderBottomWidth: 1.5,
  },
  header: {
    color: "#222",
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },
  tagAddy: {
    color: "#222",
    fontSize: 15,

    alignSelf: "center",
  },
});

export default TagScreen;
