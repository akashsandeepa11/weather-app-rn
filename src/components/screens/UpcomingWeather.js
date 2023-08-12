import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DATA from "../data/Data";
import { StatusBar } from "expo-status-bar";
import ListItem from "../ListItem";

const UpcomingWeather = ({ weatherData }) => {
  const { container, image } = styles;

  // console.log(weatherData);

  const renderItem = ({ item }) => (
    <ListItem
      dt_text={item.dt_txt}
      max={item.main.temp_max}
      min={item.main.temp_max}
      condition={item.weather[0].main}
    />
  );

  return (
    <SafeAreaView style={container}>
      <ImageBackground
        source={require("../../../assets/upcoming-background.jpg")}
        style={image}
      >
        <FlatList data={weatherData} renderItem={renderItem} />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "royalblue",
  },
  image: {
    flex: 1,
  },
});

export default UpcomingWeather;
