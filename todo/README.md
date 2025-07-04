# 📝 Simple TODO App

A clean and intuitive React Native TODO application.

## ✨ Features

- ✅ **View TODO List** - Display all your tasks in a clean, organized list
- ➕ **Add New Tasks** - Quickly add new TODO items using the input field
- ✏️ **Edit Tasks** - Modify existing task titles with inline editing
- ✅ **Toggle Completion** - Mark tasks as complete or incomplete with a simple tap
- ❌ **Delete Tasks** - Remove unwanted tasks from your list

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup Instructions

1. **Clone the repository**

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start Metro Bundler** (Optional - will start automatically when running the app)
   ```bash
   npm run start
   ```

### Running the App

#### Android

```bash
npm run android
```

#### iOS

1. **Install iOS dependencies**

   ```bash
   cd ios && pod install && cd ..
   ```

2. **Run the app**

   ```bash
   npm run ios
   ```

   > **Note:** If the command fails, try opening the project in Xcode:
   >
   > - Navigate to the `ios` folder
   > - Open `YourApp.xcworkspace` in Xcode
   > - Run the project from Xcode

## 📁 Project Structure

```
├── components/
│   ├── TodoItem.tsx          # Individual todo item component
│   ├── CustomTextInput.tsx   # Reusable input component
│   └── FloatingButton.tsx    # Floating action button component
│
├── hooks/
│   └── useTodoList.ts        # Custom hook for todo state management
│
├── types/
│   └── todo.types.ts         # TypeScript type definitions
│
├── constants/
│   └── todoConstants.ts      # Application constants
│
├── utils/
│   └── todoUtils.ts          # Utility functions
│
├── commonStyle.ts            # Shared Logics styles
├── App.tsx                   # Main application component
└── README.md                 # Project documentation
```

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **React Hooks** - Modern state management
- **Custom Components** - Reusable UI components

## 🎨 Component Overview

### `TodoItem.tsx`

Individual todo item with edit, toggle, and delete functionality.

### `CustomTextInput.tsx`

Reusable input component with custom styling and validation.

### `FloatingButton.tsx`

Floating action button for adding new todos.

### `useTodoList.ts`

Custom hook managing todo state, including:

- Adding new todos
- Editing existing todos
- Toggling completion status
- Deleting todos

## 🔧 Troubleshooting

### Common Issues

**Metro Bundler Issues**

```bash
npx react-native start --reset-cache
```

**Android Build Issues**

```bash
cd android && ./gradlew clean && cd ..
npm run android
```

**iOS Build Issues**

```bash
cd ios && pod install && cd ..
npm run ios
```

**Xcode Issues**

- Clean build folder in Xcode (`Product → Clean Build Folder`)
- Delete derived data
- Restart Xcode

## 📱 Usage

1. **Adding a Task**: Tap the floating action button and enter your task
2. **Editing a Task**: Tap on any task title to edit it inline
3. **Completing a Task**: Tap the checkbox to mark as complete/incomplete
4. **Deleting a Task**: Tap the close button to remove

---

**Happy Task Managing! 🎉**
