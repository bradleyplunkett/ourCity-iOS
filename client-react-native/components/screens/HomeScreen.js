import { CurrentRenderContext } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { Component, createRef, useEffect, useRef, useState, } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity, Pressable } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";// useSelector is mapState & useDispatch is mapDispatch
import { getAllTagsScreenStatus } from "../../redux/allTagsScreenStatus";
import { getStatus } from "../../redux/carouselStatus";
import { getGroups } from "../../redux/groups";
import { getTags } from "../../redux/tags";
import { getTagScreenStatus } from "../../redux/tagScreenStatus";
import AllTagsScreen from "./AllTagsScreen";
import CarouselCards from "./GroupsScreen";
import TagScreen from './SingleTagScreen';


const HomeScreen = (props) => {
  // Hook
  const dispatch = useDispatch();
  const mapReference = createRef();

  // Redux Store (useSelector is Hook!)
  const tags = useSelector((state) => state.tags);
  const CarouselStatus = useSelector((state) => state.carouselStatus);
  const tagScreenStatus = useSelector((state) => state.tagScreenStatus);
  const allTagsStatus = useSelector((state) => state.allTagsScreenStatus);

  // Local State
  const [tagId, setTagId] = useState(undefined);
  const [initialState, setInitialState] = useState(
    { // This has to be current location
      latitude: 40.7091089,
      longitude: -74.0058052,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  );

  // ComponentDidMount
  useEffect(() => {
    dispatch(getTags(1)); //Hard coded groupId <--might have to be this way
    // dispatch(getGroups(1))// Hard code userId <--DONT UNCOMMENT THIS Creates infinit loop
  }, []);


  const onPressGroup = () => {
    console.log('Inside onPressGroup before pressing the Group text: ', CarouselStatus);
    //upon pressing the group name, we want the carousel to pop up via conditional rendering.
    dispatch(getStatus(CarouselStatus));
  };

  const onPressMap = () => {
    console.log('Inside onPressMap before pressing the MAP: ', CarouselStatus); // Notice that this is always called when we interact with the map!!

  };

  const onPressTag = (tagId) => {
    console.log('Inside onPressTag before pressing the Marker/Tag: ', tagScreenStatus);
    // console.log('This trigers when pressed: ', event.nativeEvent);
    dispatch(getTagScreenStatus(tagScreenStatus));
    setTagId(tagId);
  }

  const onPressAllTags = () => {
    dispatch(getAllTagsScreenStatus(allTagsStatus));
  }

  return (
    <>
      < MapView
        onPress={onPressMap}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialState}
        ref={mapReference}
        showUserLocation={true}
      >
        <Text style={styles.groupsText} onPress={onPressGroup}>
          {"My Groups"}
        </Text>
        <View>
          <Text style={styles.allPlacesText} onPress={onPressAllTags}>
            {"All Places"}
          </Text>
        </View>
        <View style={styles.allGroups}>
          {
            CarouselStatus == true ?
              (
                <CarouselCards
                />
              )
              : null
          }
        </View>

        {tags.map((tag) => {
          return (
            <Marker
              key={`${tag.longitude}_${tag.latitude}`}
              coordinate={{
                latitude: tag.latitude,
                longitude: tag.longitude,
              }}
              title={tag.name}
              description={tag.description}
              identifier={`${tag.id}`}
              onPress={() => onPressTag(tag.id)}
            />
          );
        })}

        <View style={styles.tagContainer}>
          {tagScreenStatus === true ?
            (
              <TagScreen
                tagId={tagId}
              />
            )
            : null
          }
        </View>

        <View style={styles.tagContainer}>
          {
            allTagsStatus === true ?
              (
                <AllTagsScreen
                  mapRef={mapReference}
                />
              )
              : null
          }
        </View>

      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  groupsText: {
    paddingTop: 50,
    marginLeft: 60,
    fontFamily: "Cochin",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
    width: '25%',
    bottom: 0,
    // backgroundColor:'blue',
  },
  allPlacesText: {
    paddingTop: 50,
    marginLeft: 250,
    fontFamily: "Cochin",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
    width: '25%',
    height: '30%',
    bottom: 0,
    // backgroundColor:'red',
  },
  allGroups:{
    // backgroundColor:'grey',
    top:-250,
  },
  tagContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 40,
  },
});

export default HomeScreen;
