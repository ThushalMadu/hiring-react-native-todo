/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTodoList } from './hooks/useTodoList';
import TodoItem from './components/TodoItem';
import CustomTextInput from './components/CustomTextInput';
import FloatingActionButton from './components/FloatingButton';
import {
  getHeightByPercentage,
  getWidthByPercentage,
} from './utils/commonStyle';
import {
  COLORS,
  FONT_SIZES,
  FONT_TYPES,
  TODO_LIST_VALIDATION,
} from './constants/todoConstants';
import { Todo } from './types/todo.types';

const App: React.FC = () => {
  const {
    todos,
    newTodoText,
    setNewTodoText,
    isInputVisible,
    editingTodoId,
    editingText,
    setEditingText,
    addTodo,
    toggleTodoComplete,
    deleteTodo,
    startEditing,
    saveEdit,
    cancelEdit,
    toggleInputVisibility,
  } = useTodoList();

  const handleFabPress = () => {
    if (isInputVisible) {
      Keyboard.dismiss();
    }
    toggleInputVisibility();
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TodoItem
      todo={item}
      onToggleComplete={toggleTodoComplete}
      onEdit={startEditing}
      onDelete={deleteTodo}
      isEditing={editingTodoId === item.id}
      editValue={editingText}
      onEditValueChange={setEditingText}
      onSaveEdit={saveEdit}
      onCancelEdit={cancelEdit}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>
        {TODO_LIST_VALIDATION.emptyStateMessage}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{TODO_LIST_VALIDATION.screenTitle}</Text>
          </View>

          {/* Textinput */}
          {isInputVisible && (
            <Animated.View entering={FadeInDown.duration(300)}>
              <CustomTextInput
                value={newTodoText}
                onChangeText={setNewTodoText}
                onSubmit={addTodo}
                placeholder={TODO_LIST_VALIDATION.addTaskPlaceholder}
                autoFocus
              />
            </Animated.View>
          )}

          {/* Todo List */}
          <View style={styles.listContainer}>
            <FlatList
              data={todos}
              renderItem={renderTodoItem}
              keyExtractor={item => item.id}
              ListEmptyComponent={renderEmptyState}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={
                todos.length === 0 ? styles.emptyListContent : undefined
              }
            />
          </View>
        </View>

        {/* Floating Action Button */}
        <FloatingActionButton
          onPress={handleFabPress}
          isInputVisible={isInputVisible}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS == 'ios' ? getHeightByPercentage(4) : 0,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingVertical: getHeightByPercentage(2),
    paddingHorizontal: getWidthByPercentage(5),
  },
  title: {
    fontSize: FONT_SIZES.xxxs,
    fontFamily: FONT_TYPES.BOLD,
    color: COLORS.text,
    marginBottom: getHeightByPercentage(1),
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: getWidthByPercentage(5),
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getHeightByPercentage(10),
  },
  emptyStateText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONT_TYPES.REGULAR,
    color: COLORS.text,
    textAlign: 'center',
  },
});

export default App;
