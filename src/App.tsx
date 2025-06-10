import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography, Paper } from '@mui/material';
import { Todo, Category, CategoryConfig, PrayerTime } from './types';
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
    description: 'Track your monthly learning goals and daily tasks',
    subCategories: {
      monthly: {
        icon: '📅',
        description: 'Monthly learning goals and milestones',
      },
      daily: {
        icon: '📝',
        description: 'Daily learning tasks and practice',
      },
    },
  },
  Prayers: {
    icon: '🙏',
    color: '#9c27b0',
    description: 'Daily prayer times and spiritual activities',
    subCategories: {
      Fajr: {
        icon: '🌅',
        description: 'Dawn prayer',
      },
      Dhuhr: {
        icon: '☀️',
        description: 'Midday prayer',
      },
      Asr: {
        icon: '🌤️',
        description: 'Afternoon prayer',
      },
      Maghrib: {
        icon: '🌅',
        description: 'Sunset prayer',
      },
      Isha: {
        icon: '🌙',
        description: 'Night prayer',
      },
    },
  },
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState<Category>('Home');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, category: Category, subCategory?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      category,
      createdAt: new Date(),
    };

    if (category === 'Learning' && subCategory === 'monthly') {
      // Set due date to end of current month
      const now = new Date();
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      newTodo.dueDate = lastDay;
    } else if (category === 'Prayers' && subCategory) {
      newTodo.prayerTime = subCategory as PrayerTime;
    }

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

  const filteredTodos = todos.filter((todo) => {
    if (todo.category !== selectedCategory) return false;
    if (selectedCategory === 'Learning' && selectedSubCategory) {
      return selectedSubCategory === 'monthly' ? !!todo.dueDate : !todo.dueDate;
    }
    if (selectedCategory === 'Prayers' && selectedSubCategory) {
      return todo.prayerTime === selectedSubCategory;
    }
    return true;
  });

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
              onCategoryChange={(category) => {
                setSelectedCategory(category);
                setSelectedSubCategory('');
              }}
              categoryConfigs={categoryConfigs}
            />
            <AddTodo
              onAdd={addTodo}
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              onSubCategoryChange={setSelectedSubCategory}
            />
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
