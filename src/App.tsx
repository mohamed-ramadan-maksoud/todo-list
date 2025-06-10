import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography, Paper } from '@mui/material';
import { Todo, Category, CategoryConfig, PrayerTime, LearningType } from './types';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import CategoryTabs from './components/CategoryTabs';
import SubCategoryTabs from './components/SubCategoryTabs';
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

const CATEGORY_CONFIG: Record<Category, CategoryConfig> = {
  Home: {
    icon: '🏠',
    color: '#4CAF50',
    description: 'Tasks related to home and daily life',
    subCategories: {
      'Daily': { icon: '📅', color: '#4CAF50', description: 'Daily home tasks' },
      'Monthly': { icon: '📊', color: '#9C27B0', description: 'Monthly home tasks' },
    },
  },
  Learning: {
    icon: '📚',
    color: '#2196F3',
    description: 'Learning and educational tasks',
    subCategories: {
      'Daily': { icon: '📝', color: '#2196F3', description: 'Daily learning tasks' },
      'Monthly': { icon: '🎯', color: '#673AB7', description: 'Monthly learning milestones' },
    },
  },
  Prayers: {
    icon: '🕌',
    color: '#9C27B0',
    description: 'Daily prayer times',
    subCategories: {
      'Fajr': { icon: '🌅', color: '#FF9800', description: 'Dawn prayer' },
      'Dhuhr': { icon: '☀️', color: '#FFC107', description: 'Midday prayer' },
      'Asr': { icon: '🌤️', color: '#FF5722', description: 'Afternoon prayer' },
      'Maghrib': { icon: '🌅', color: '#F44336', description: 'Sunset prayer' },
      'Isha': { icon: '🌙', color: '#673AB7', description: 'Night prayer' },
    },
  },
};

const DEFAULT_PRAYER_TASKS: Todo[] = [
  {
    id: 'Fajr',
    text: 'Fajr (الفجر)',
    completed: false,
    category: 'Prayers',
    createdAt: new Date(),
    prayerTime: 'Fajr',
  },
  {
    id: 'Dhuhr',
    text: 'Dhuhr (الظهر)',
    completed: false,
    category: 'Prayers',
    createdAt: new Date(),
    prayerTime: 'Dhuhr',
  },
  {
    id: 'Asr',
    text: 'Asr (العصر)',
    completed: false,
    category: 'Prayers',
    createdAt: new Date(),
    prayerTime: 'Asr',
  },
  {
    id: 'Maghrib',
    text: 'Maghrib (المغرب)',
    completed: false,
    category: 'Prayers',
    createdAt: new Date(),
    prayerTime: 'Maghrib',
  },
  {
    id: 'Isha',
    text: 'Isha (العشاء)',
    completed: false,
    category: 'Prayers',
    createdAt: new Date(),
    prayerTime: 'Isha',
  },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Clear all existing data
    localStorage.removeItem('todos');
    localStorage.removeItem('lastSavedDate');
    
    // Return only prayer tasks
    return DEFAULT_PRAYER_TASKS;
  });

  const [selectedCategory, setSelectedCategory] = useState<Category>('Home');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (selectedCategory === 'Prayers') return; // Prevent adding new prayer tasks
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      category: selectedCategory,
      createdAt: new Date(),
      type: selectedCategory === 'Learning' ? (selectedSubCategory as LearningType) : undefined,
    };

    if (selectedCategory === 'Learning' && selectedSubCategory === 'Monthly') {
      // For monthly tasks, set due date to end of current month
      const now = new Date();
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      newTodo.dueDate = lastDay;
      newTodo.progress = 0;
      newTodo.dailyTasks = [];
      newTodo.completedDailyTasks = [];
    }

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, completed: !todo.completed };
          
          // Update progress for monthly tasks
          if (todo.category === 'Learning' && todo.type === 'Monthly' && todo.dailyTasks) {
            const totalTasks = todo.dailyTasks.length;
            const completedTasks = todo.completedDailyTasks?.length || 0;
            updatedTodo.progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
          }
          
          return updatedTodo;
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addDailyTaskToMonthly = (monthlyTaskId: string, dailyTaskText: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === monthlyTaskId) {
          return {
            ...todo,
            dailyTasks: [...(todo.dailyTasks || []), dailyTaskText],
            completedDailyTasks: todo.completedDailyTasks || [],
          };
        }
        return todo;
      })
    );
  };

  const toggleDailyTask = (monthlyTaskId: string, dailyTaskIndex: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === monthlyTaskId && todo.dailyTasks) {
          const dailyTask = todo.dailyTasks[dailyTaskIndex];
          const completedDailyTasks = todo.completedDailyTasks || [];
          const isCompleted = completedDailyTasks.includes(dailyTask);
          
          const updatedCompletedTasks = isCompleted
            ? completedDailyTasks.filter((task) => task !== dailyTask)
            : [...completedDailyTasks, dailyTask];

          const progress = (updatedCompletedTasks.length / todo.dailyTasks.length) * 100;

          return {
            ...todo,
            completedDailyTasks: updatedCompletedTasks,
            progress,
          };
        }
        return todo;
      })
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (todo.category !== selectedCategory) return false;
    if (selectedCategory === 'Learning' && selectedSubCategory) {
      return todo.type === selectedSubCategory;
    }
    return true;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            📝 My Todo List
          </Typography>
          <CategoryTabs
            selectedCategory={selectedCategory}
            onCategoryChange={(category) => {
              setSelectedCategory(category);
              setSelectedSubCategory('');
            }}
            categoryConfigs={CATEGORY_CONFIG}
          />
          {selectedCategory !== 'Prayers' && (
            <Box sx={{ mt: 2 }}>
              <SubCategoryTabs
                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
                onSubCategoryChange={setSelectedSubCategory}
                categoryConfigs={CATEGORY_CONFIG}
              />
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          {selectedCategory !== 'Prayers' && (
            <AddTodo onAdd={addTodo} />
          )}
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={selectedCategory === 'Prayers' ? undefined : deleteTodo}
            categoryConfig={CATEGORY_CONFIG[selectedCategory]}
            onAddDailyTask={addDailyTaskToMonthly}
            onToggleDailyTask={toggleDailyTask}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
