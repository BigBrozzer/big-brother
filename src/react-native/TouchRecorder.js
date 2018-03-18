import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  InteractionManager,
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Modal,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BlurView } from 'react-native-blur';
var { getInstanceFromNode } = require('ReactNativeComponentTree');

import { startRecording, stopRecording, sendRecords, startPlaying, saveRNUserActions } from '../middleware/journeyConnector';

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
    userActions: [],
    isRecording: false,
    isControlsModalVisible: false,
    isReplayVisible: false,
    replayId: null,
    lastRecorId: '5aae3decc2ef1639d45f873c',
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
    this.setState(state => {
      if (state.isRecording) {
        stopRecording();
        saveRNUserActions(this.state.touches);
        sendRecords()
          .then(id => {
            this.setState({ lastRecorId: id });
          });
      } else {
        startRecording();
      }
      return {
        isRecording: !state.isRecording,
        isControlsModalVisible: false
      };
    }, this._enableAdding);
  };

  _showControlsModal() {
    this.setState({ isControlsModalVisible: true });
  }

  _hideControlsModal() {
    this.setState({ isControlsModalVisible: false });
  }

  _toggleReplayInput() {
    this.setState(state => ({ isReplayVisible: !state.isReplayVisible }));
  }

  _onReplayIdChange(text) {
    this.setState({ replayId: text });
  }

  _startReplay(replayId) {
    startPlaying(replayId || this.state.replayId)
      .then(({ userActions_rn }) => {
        this.setState({
          userActions: userActions_rn,
          isRecording: false,
          isControlsModalVisible: false,
        });
      });
  }

  render() {
    const { isRecording, isControlsModalVisible, isReplayVisible, lastRecorId } = this.state;
    return (
      <TouchableWithoutFeedback
        onLongPress={this._showControlsModal.bind(this)}
        style={styles.container}
        pointerEvents="box-none"
        onPressIn={this._onTouchStart.bind(this)}
        onPressOut={this._onTouchEnd.bind(this)}
      >
      <View style={styles.container}>
        {this.props.children}
        {!isRecording && this.state.userActions.map(this.renderHint.bind(this))}
        <Modal
          visible={isControlsModalVisible}
          animationType="slide"
          transparent
          onRequestClose={this._hideControlsModal.bind(this)}
        >
          <TouchableOpacity onPress={this._hideControlsModal.bind(this)} style={styles.closeBtnContainer}>
            <Text style={styles.closeBtnIcon}>X</Text>
          </TouchableOpacity>
          <BlurView
            style={styles.absolute}
            viewRef={this.modalContent}
            blurType="dark"
            blurAmount={5}
          />
          <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
            <View
              style={styles.modalContent}
              ref={modalContent => {
                if (modalContent) {
                  this.modalContent = modalContent;
                }
              }}
            >
              <TouchableOpacity
                style={styles.btn}
                onPress={this._startRecording.bind(this)}
                onPressIn={this._disableAdding.bind(this)}
              >
                <Text style={styles.btnText}>{isRecording ? 'Stop' : 'Start'} Recording</Text>
              </TouchableOpacity>
              <View style={styles.replayControlsWrapper}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={this._toggleReplayInput.bind(this)}
                >
                  <Text style={styles.btnText}>Replay</Text>
                </TouchableOpacity>
                {isReplayVisible && (
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      autoFocus
                      autoCorrect={false}
                      placeholder="Replay ID"
                      onChangeText={this._onReplayIdChange.bind(this)}
                      onSubmitEditing={this._startReplay.bind(this)}
                      returnKeyType="go"
                      clearButtonMode="while-editing"
                    />
                    <TouchableOpacity
                      style={styles.btn_id}
                      onPress={() => {
                        this._startReplay(lastRecorId);
                      }}
                    >
                      <Text style={styles.btnText}>Last recording: {lastRecorId}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <Text style={styles.hintText}>
                Tap and hold 
                to finish recording
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </Modal>
      </View>
      </TouchableWithoutFeedback>
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
  inputWrapper: {
    marginTop: 10,
    height: 55,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  btn: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 35,
    paddingVertical: 5,
    paddingHorizontal: 15,
    height: 55,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  replayControlsWrapper: {
    marginVertical: 15,
    flexDirection: 'column',
  },
  closeBtnContainer: {
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: 'red',
    position: 'absolute',
    padding: 10,
    top: 0,
    left: 0,
    right: 0,
  },
  closeBtnIcon: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.7)'
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  hintText: {
    color: 'white',
    fontSize: 15,
    position: 'absolute',
    bottom: 50,
  },
  container: {
    flex: 1,
  },
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
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
