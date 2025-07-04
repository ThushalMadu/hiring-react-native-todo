// Generates a unique ID for todos
export const generateTodoId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

// Validates if a string is a valid todo title
export const isValidTodoTitle = (title: string): boolean => {
  return title.trim().length > 0 && title.trim().length <= 250;
};
