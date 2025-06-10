import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography, Paper } from '@mui/material';
import { Todo, Category, CategoryConfig } from './types';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import CategoryTabs from './components/CategoryTabs';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const categoryConfigs: Record<Category, CategoryConfig> = {
  Home: {
    icon: '🏠',
    color: '#4caf50',
    description: 'Tasks related to cleaning, cooking, and home maintenance',
  },
  Learning: {
    icon: '📚',
    color: '#2196f3',
    description: 'Track progress for studying, coding, or personal growth',
  },
  Prayers: {
    icon: '🙏',
    color: '#9c27b0',
    description: 'Manage prayer times or mindfulness activities',
  },
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState<Category>('Home');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, category: Category) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      category,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => todo.category === selectedCategory);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            ✨ My Awesome Todo List ✨
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <CategoryTabs
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categoryConfigs={categoryConfigs}
            />
            <AddTodo onAdd={addTodo} selectedCategory={selectedCategory} />
          </Paper>
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            categoryConfig={categoryConfigs[selectedCategory]}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
