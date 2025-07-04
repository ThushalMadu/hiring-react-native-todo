import { useState, useCallback } from 'react';
import { useMMKVObject } from 'react-native-mmkv';
import { Todo } from '../types/todo.types';
import { generateTodoId, isValidTodoTitle } from '../utils/todoUtils';

const STORAGE_KEY = 'todos';

export const useTodoList = () => {
  const [todos, setTodos] = useMMKVObject<Todo[]>(STORAGE_KEY);
  const [newTodoText, setNewTodoText] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<string>('');
  const [editingText, setEditingText] = useState('');

  const safeTodos = todos ?? [];

  const addTodo = useCallback(() => {
    if (!isValidTodoTitle(newTodoText)) return;

    const newTodo: Todo = {
      id: generateTodoId(),
      title: newTodoText,
      isCompleted: false,
    };

    const updatedTodos = [newTodo, ...safeTodos];
    setTodos(updatedTodos);
    setNewTodoText('');
    setIsInputVisible(false);
  }, [newTodoText, safeTodos, setTodos]);

  const toggleTodoComplete = useCallback(
    (id: string) => {
      const updatedTodos = safeTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      );
      setTodos(updatedTodos);
    },
    [safeTodos, setTodos],
  );

  const deleteTodo = useCallback(
    (id: string) => {
      const updatedTodos = safeTodos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    },
    [safeTodos, setTodos],
  );

  const startEditing = useCallback((todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditingText(todo.title);
  }, []);

  const saveEdit = useCallback(() => {
    if (!isValidTodoTitle(editingText)) return;

    const updatedTodos = safeTodos.map(todo =>
      todo.id === editingTodoId ? { ...todo, title: editingText } : todo,
    );
    setTodos(updatedTodos);
    setEditingTodoId('');
    setEditingText('');
  }, [editingText, editingTodoId, safeTodos, setTodos]);

  const cancelEdit = useCallback(() => {
    setEditingTodoId('');
    setEditingText('');
  }, []);

  const toggleInputVisibility = useCallback(() => {
    setIsInputVisible(prev => !prev);
  }, []);

  return {
    todos: safeTodos,
    newTodoText,
    setNewTodoText,
    isInputVisible,
    setIsInputVisible,
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
  };
};
