import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Animated, { BounceInUp, FadeInUp } from 'react-native-reanimated';
import {
  getHeightByPercentage,
  getWidthByPercentage,
} from '../utils/commonStyle';
import { TodoItemProps } from '../types/todo.types';
import { COLORS, FONT_SIZES, FONT_TYPES } from '../constants/todoConstants';

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
  isEditing,
  editValue,
  onEditValueChange,
  onSaveEdit,
  onCancelEdit,
}) => {
  return (
    <Animated.View
      entering={BounceInUp}
      exiting={FadeInUp}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => onToggleComplete(todo.id)}
        style={[
          styles.checkbox,
          todo.isCompleted ? styles.checkColor : styles.notCheckColor,
        ]}
      >
        {todo.isCompleted && (
          <Image
            source={require('../assets/images/check.png')}
            style={styles.checkIconStyle}
          />
        )}
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          autoFocus
          value={editValue}
          onChangeText={onEditValueChange}
          style={styles.editInput}
          onSubmitEditing={onSaveEdit}
          onBlur={onCancelEdit}
          returnKeyType="done"
        />
      ) : (
        <TouchableOpacity
          onPress={() => onEdit(todo)}
          style={styles.textContainer}
        >
          <Text
            style={[styles.todoText, todo.isCompleted && styles.completedText]}
            numberOfLines={2}
          >
            {todo.title}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => onDelete(todo.id)}
        style={styles.deleteButton}
      >
        <Image
          source={require('../assets/images/delete.png')}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: getHeightByPercentage(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getWidthByPercentage(3),
    paddingHorizontal: getWidthByPercentage(1),
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getWidthByPercentage(3),
  },
  textContainer: {
    flex: 1,
    marginRight: getWidthByPercentage(1),
  },
  todoText: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONT_TYPES.REGULAR,
    color: COLORS.text,
    lineHeight: 22,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: COLORS.lineThorugh,
  },
  editInput: {
    flex: 1,
    fontSize: FONT_SIZES.xs,
    fontFamily: FONT_TYPES.REGULAR,
    paddingVertical: getHeightByPercentage(1),
    paddingHorizontal: getWidthByPercentage(1),
    marginRight: getWidthByPercentage(1),
  },
  deleteButton: {
    padding: getWidthByPercentage(2),
    borderRadius: 20,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.danger,
  },
  checkIconStyle: {
    width: 30,
    height: 30,
  },
  checkColor: { backgroundColor: COLORS.blue },
  notCheckColor: { backgroundColor: COLORS.black },
});

export default TodoItem;
