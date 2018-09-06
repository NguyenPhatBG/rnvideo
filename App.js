import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Video from "react-native-video";
import Icon from 'react-native-vector-icons/FontAwesome';
import LightVideo from './big_buck_bunny.mp4';

const { width } = Dimensions.get("screen");
const height = width * 0.5625;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  handleError = (meta) => {
    const { error: { code } } = meta;
    let error = "An error occurred playing this video";
    switch (code) {
      case -11800:
        error = "Could not load vide from URL";
        break;
    }
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    return (
      <View style={styles.container}>
        <View style={error ? styles.error : undefined}>
          <Video
            style={{ height, width }}
            // source={{ uri: 'https://google.com/video/abcsoft' }}
            source={LightVideo}
            resizeMode={'contain'}
            paused={false}
            ref={player => {
              this.player = player;
            }}
            onEnd={() => {
              this.player.seek(0);
            }}
            onError={this.handleError}
          />
          <View style={styles.videCover}>
            {error && <Icon name={'exclamation-triangle'} size={30} color={'red'} />}
            {error && <Text>{error}</Text>}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  videCover: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(255,255,255,0.9)' error need
  },
  error: {
    backgroundColor: '#000'
  }
});
