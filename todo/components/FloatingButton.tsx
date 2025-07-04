import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  Platform,
  Keyboard,
  StyleSheet,
  Image,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { FloatingButtonProps } from '../types/todo.types';
import { COLORS } from '../constants/todoConstants';

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  isInputVisible,
}) => {
  const offset = useSharedValue(0);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      event => {
        const keyboardHeight = event.endCoordinates.height;
        const spacing = 30;
        offset.value = withTiming(keyboardHeight - spacing, {
          duration: 250,
        });
      },
    );

    const keyboardHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        offset.value = withTiming(0, { duration: 250 });
      },
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [offset]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -offset.value }],
  }));

  return (
    <Animated.View style={[fabStyles.container, animatedStyle]}>
      <TouchableOpacity onPress={onPress} style={fabStyles.button}>
        {isInputVisible ? (
          <Image
            source={require('../assets/images/close.png')}
            style={fabStyles.floatCloseIconStyle}
          />
        ) : (
          <Image
            source={require('../assets/images/add.png')}
            style={fabStyles.floatIconStyle}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const fabStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 24,
    bottom: 40,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowColor: COLORS.black,
  },
  floatIconStyle: {
    width: 35,
    height: 35,
  },
  floatCloseIconStyle: {
    width: 25,
    height: 25,
  },
});

export default FloatingButton;
