import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {
  getHeightByPercentage,
  getWidthByPercentage,
} from '../utils/commonStyle';
import { CustomTextInputProps } from '../types/todo.types';
import { COLORS, FONT_SIZES, FONT_TYPES } from '../constants/todoConstants';

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Enter the Task',
  autoFocus = false,
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.checkbox} />
      <TextInput
        autoFocus={autoFocus}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: getWidthByPercentage(6),
    paddingVertical: getHeightByPercentage(2),
    marginBottom: getHeightByPercentage(1),
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getWidthByPercentage(3),
    backgroundColor: COLORS.black,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.xs,
    fontFamily: FONT_TYPES.REGULAR,
    paddingVertical: getHeightByPercentage(1),
    width: '100%',
    color: COLORS.text,
  },
});

export default CustomTextInput;
