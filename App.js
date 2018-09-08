import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, Animated, PanResponder } from "react-native";
import Video from "react-native-video";
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBar from 'react-native-progress/Bar';
import LightVideo from "./big_buck_bunny.mp4";

function secondsToTime(time) {
  return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
}

export default class rnvideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      progress: 0,
      duration: 0
    };
  }

  animated = new Animated.Value(0)

  componentWillMount = () => {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => {
        this.triggerShowHide();
        return false;
      }
    })
  };


  handleLoad = (meta) => {
    this.triggerShowHide();
    this.setState({
      duration: meta.duration
    });
  }

  handleProgress = (progress) => {
    this.setState({
      progress: progress.currentTime / this.state.duration
    });
  }

  handleEnd = () => {
    this.setState({ paused: true });
  }

  handleMainButtonTouch = () => {
    if (this.state.progress >= 1) {
      this.player.seek(0);
    }
    this.setState(state => {
      return {
        paused: !state.paused
      }
    })
  }

  handleProgressPress = (e) => {
    const position = e.nativeEvent.locationX;
    const progress = (position / 250) * this.state.duration;
    this.player.seek(progress);
  }

  triggerShowHide = () => {
    clearTimeout(this.hideTimeout);
    Animated.timing(this.animated, {
      toValue: 1,
      duration: 100
    }).start();
    this.hideTimeout = setTimeout(() => {
      Animated.timing(this.animated, {
        toValue: 0,
        duration: 300
      }).start();
    }, 1500);
  }

  render() {
    const { width } = Dimensions.get('window');
    const height = width * .5625;

    const interpolatedControls = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [48, 0],
    })

    const controlHideStyle = {
      transform: [
        {
          translateY: interpolatedControls
        }
      ]
    }
    return (
      <View style={styles.container}>
        <View 
          {...this.panResponder.panHandlers}
          style={styles.videoContainer}
        >
          <Video
            paused={this.state.paused}
            source={LightVideo}
            repeat={true}
            style={{ width: '100%', height }}
            resizeMode='contain'
            onLoad={this.handleLoad}
            onProgress={this.handleProgress}
            onEnd={this.handleEnd}
            ref={ref => {
              this.player = ref
            }}
          />
          <Animated.View style={[styles.controls, controlHideStyle]}>
            <TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
              <Icon name={!this.state.paused ? 'pause' : 'play'} size={30} color={'#FFF'} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.handleProgressPress}>
              <View>
                <ProgressBar
                  progress={this.state.progress}
                  color={'#FFFFFF'}
                  unfilledColor='rgba(255,255,255,.5)'
                  borderColor="#FFFFFF"
                  width={250}
                  height={20}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.duration}>
              {secondsToTime(Math.floor(this.state.progress * this.state.duration))}
            </Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 250
  },
  videoContainer: {
    overflow: 'hidden',
    zIndex: 9999 // required on Android
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 48,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  mainButton: {
    marginRight: 15
  },
  duration: {
    color: '#FFF',
    marginLeft: 15
  }
});
