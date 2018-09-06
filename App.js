import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import Video from "react-native-video";
import Icon from 'react-native-vector-icons/FontAwesome';
import LightVideo from './big_buck_bunny.mp4';

const { width } = Dimensions.get("screen");
const height = width * 0.5625;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      lightVideo: true,
      buffering: true,
      animated: new Animated.Value(0)
    };
  }

  handleLoadStart = () => {
    this.triggerBufferAnimation();
  }

  triggerBufferAnimation = () => {
    this.loopingAnimation = Animated.loop(
      Animated.timing(this.state.animated, {
        toValue: 1,
        duration: 350,
      })
    ).start();
  }

  handleBuffer = (meta) => {
    meta.isBuffering && this.triggerBufferAnimation();
    if (this.loopingAnimation && !meta.isBuffering) {
      this.loopingAnimation.stopAnimation();
    }
    this.setState({ buffering: meta.isBuffering });
  }

  handleError = (meta) => {
    const { error: { code } } = meta;
    let error = "An error occurred playing this video";
    switch (code) {
      case -11800:
        error = "Could not load video from URL";
        break;
    }
    this.setState({ error });
  }

  render() {
    const { error, lightVideo, buffering, animated } = this.state;
    const interpolatedAnimation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const rotateStyle = {
      transform: [
        {
          rotate: interpolatedAnimation
        }
      ]
    }
    return (
      <View style={styles.container}>
        <View style={error | buffering ? styles.errorOrbuffering : undefined}>
          <Video
            style={{ height, width }}
            source={lightVideo || buffering ? LightVideo : { uri: 'https://google.com/video/abcsoft' }}
            resizeMode={'contain'}
            paused={false}
            ref={player => {
              this.player = player;
            }}
            onLoadStart={this.handleLoadStart}
            onBuffer={this.handleBuffer}
            onEnd={() => {
              this.player.seek(0);
            }}
            onError={this.handleError}
          />
          <View style={[styles.videCover, { backgroundColor: lightVideo || buffering ? 'transparent' : 'rgba(255,255,255,0.9)' }]}>
            {error && <Icon name={'exclamation-triangle'} size={30} color={'red'} />}
            {error && <Text>{error}</Text>}
            {buffering && <Animated.View style={rotateStyle}><Icon name={'circle-o-notch'} size={30} color={'#FFF'} /></Animated.View>}
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
    bottom: 0
  },
  errorOrbuffering: {
    backgroundColor: '#000'
  }
});

// network ?
