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
  
  render() {
    const { id, y, x, onPressIn, onPress } = this.props;
    return (
      <TouchableOpacity
        onPressIn={onPressIn}
        onPress={onPress}
        pointerEvents="box-only"
        style={[styles.hintBtn, {
          top: y - (styles.btnSize / 2),
          left: x - (styles.btnSize / 2),
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
}

class TouchRecorder extends Component {
  state = {
    touches: [],
    isRecording: false,
  };
  shouldAdd = true;

  _onTouchEnd(event) {
    const { isRecording } = this.state;
    if (isRecording && this.shouldAdd) {
      event.persist();
      this.setState(state => {
        return { touches: [...state.touches, {
          id: `${event.nativeEvent.pageX}_${event.nativeEvent.pageY}`,
          x: event.nativeEvent.pageX,
          y: event.nativeEvent.pageY,
          timestamp: event.nativeEvent.timestamp,
          timeDiff: (event.nativeEvent.timestamp - (state.touches[0] || {}).timestamp) || 0,
        }]};
      });
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

export default withRecorder = Component => props => {
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
  hintBtn: {
    position: 'absolute',
  },
});
