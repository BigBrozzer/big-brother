import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  InteractionManager,
  Animated,
  StyleSheet,
} from 'react-native';
var { getInstanceFromNode } = require('ReactNativeComponentTree');

class TouchHint extends Component {
  opacity = new Animated.Value(0);
  scale = new Animated.Value(0);
  currentTouchId = null;

  componentDidMount() {
    const { timeDiff } = this.props;
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(this.opacity, {
          toValue: 0.6,
          duration: 200,
        }),
        Animated.timing(this.scale, {
          toValue: 1,
          duration: 400,
        })
      ]).start();
    }, timeDiff);
  }

  _renderTap() {
    const {
      id,
      y_start,
      x_start,
      timestamp_start,
      onPressIn,
      onPress,
    } = this.props;

    return (
      <TouchableOpacity
        onPressIn={onPressIn}
        onPress={onPress}
        style={[styles.hintBtn, {
          top: y_start - (styles.btnSize / 2),
          left: x_start - (styles.btnSize / 2),
          transform: [{
            scale: this.scale.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 0.6, 1]
            })
          }],
        }]}
      >
        <Animated.View style={[styles.hint, { opacity: this.opacity }]} />
      </TouchableOpacity>
    );
  }

  _renderSwipe() {
    const {
      id,
      y_start,
      y_end,
      x_start,
      x_end,
      timestamp_start,
      timestamp_end,
      onPressIn,
      onPress,
    } = this.props;

    return (
      <View style={{
        flex: 1,
        position: 'absolute',
      }}>
        <TouchableOpacity
          onPressIn={onPressIn}
          onPress={onPress}
          style={[styles.hintBtn, {
            top: y_start - (styles.btnSize / 2),
            left: x_start - (styles.btnSize / 2),
            transform: [{
              scale: this.scale.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0.6, 1]
              })
            }],
          }]}
        >
          <Animated.View style={[styles.hint_green, { opacity: this.opacity }]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={onPressIn}
          onPress={onPress}
          style={[styles.hintBtn, {
            top: y_end - (styles.btnSize / 2),
            left: x_end - (styles.btnSize / 2),
            transform: [{
              scale: this.scale.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0.6, 1]
              })
            }],
          }]}
        >
          <Animated.View style={[styles.hint_green, { opacity: this.opacity }]} />
        </TouchableOpacity>
      </View>
    );
  }
  
  render() {
    const {
      timestamp_start,
      timestamp_end,
    } = this.props;
    if (timestamp_end - timestamp_start < 500) {
      return this._renderTap();
    }
    return this._renderSwipe();
  }
}

class TouchRecorder extends Component {
  state = {
    touches: [],
    isRecording: false,
  };
  shouldAdd = true;

  _onTouchStart(event) {
    const { isRecording } = this.state;
    if (isRecording && this.shouldAdd) {
      event.persist();
      this.currentTouchId = `${event.nativeEvent.pageX}_${event.nativeEvent.pageY}`;
      this.setState(state => {
        return { touches: [...state.touches, {
          id: this.currentTouchId,
          x_start: event.nativeEvent.pageX,
          y_start: event.nativeEvent.pageY,
          timestamp_start: event.nativeEvent.timestamp,
          timeDiff: (event.nativeEvent.timestamp - (state.touches[0] || {}).timestamp_start) || 0,
        }]};
      });
    }
  }

  _onTouchEnd(event) {
    const { isRecording, touches } = this.state;
    const existingEventIndex = touches.findIndex(t => t.id === this.currentTouchId);
    if (isRecording && this.shouldAdd) {
      event.persist();
      const updatedEvents = [...touches];
      updatedEvents.splice(existingEventIndex, 1, {
        ...touches[existingEventIndex],
        x_end: event.nativeEvent.pageX,
        y_end: event.nativeEvent.pageY,
        timestamp_end: event.nativeEvent.timestamp,
      });
      this.setState({ touches: updatedEvents });
    }
  };

  _removeHint(id) {
    this.setState(state => ({
      touches: state.touches.filter(t => t.id !== id),
    }), this._enableAdding);
  }

  _removeHintAfterInteractions(id) {
    InteractionManager.runAfterInteractions(() => this._removeHint(id));
  }

  _disableAdding() {
    this.shouldAdd = false;
  }

  _enableAdding() {
    this.shouldAdd = true;
  }

  renderHint(coords) {

    return (
      <TouchHint
        {...coords}
        key={coords.id}
        onPressIn={this._disableAdding.bind(this)}
        onPress={this._removeHintAfterInteractions.bind(this, coords.id)}
      />
    );
  }

  _startRecording() {
    this.setState(state => ({ isRecording: !state.isRecording }), this._enableAdding);
  };

  render() {
    const { isRecording } = this.state;
    return (
      <View
        style={styles.container}
        onStartShouldSetResponder={event => !!event}
        pointerEvents="box-none"
        onTouchStart={this._onTouchStart.bind(this)}
        onTouchEnd={this._onTouchEnd.bind(this)}
      >
        {this.props.children}
        {!isRecording && this.state.touches.map(this.renderHint.bind(this))}
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 10, left: 10 }}
          onPress={this._startRecording.bind(this)}
          onPressIn={this._disableAdding.bind(this)}
        >
          <View style={{ width: touchSize, height: touchSize, borderRadius: touchSize / 2, backgroundColor: 'red'}}></View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Component => props => {
  return (
    <TouchRecorder>
      <Component {...props} />
    </TouchRecorder>
  );
};
const touchSize = 40;
const styles = StyleSheet.create({
  btnSize: touchSize,
  container: {
    flex: 1,
  },
  hint: {
    width: touchSize,
    height: touchSize,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderRadius: touchSize / 2,
  },
  hint_green: {
    width: touchSize,
    height: touchSize,
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
    borderRadius: touchSize / 2,
  },
  hintBtn: {
    position: 'absolute',
  },
});
