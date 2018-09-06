import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text, Keyboard, TouchableWithoutFeedback, Button } from "react-native";
import Video from "react-native-video";
import LightVideo from "./big_buck_bunny.mp4";

export default class rnvideo extends Component {
  render() {
    return (
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Video repeat source={LightVideo} resizeMode="cover" style={StyleSheet.absoluteFill} />
          <View>
            <Text style={styles.header}>Login Form</Text>
            <View style={styles.clearContainer}>
              <TextInput
                placeholder="Email"
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'#95a5a6'}
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'#95a5a6'}
                secureTextEntry
                style={styles.input}
              />
            </View>
            <View style={styles.clearContainer}>
              <Button title="Login" onPress={() => alert('login pressed.')} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    color: "#FFF",
    backgroundColor: "transparent",
    textAlign: "center"
  },
  clearContainer: {
    paddingTop: 30
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: "#FFF",
    marginVertical: 15,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    borderRadius: 30
  }
});