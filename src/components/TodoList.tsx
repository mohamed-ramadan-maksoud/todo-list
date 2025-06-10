import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Box,
  Chip,
  LinearProgress,
  TextField,
  Button,
  Collapse,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Todo, CategoryConfig } from '../types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
  categoryConfig: CategoryConfig;
  onAddDailyTask?: (monthlyTaskId: string, dailyTaskText: string) => void;
  onToggleDailyTask?: (monthlyTaskId: string, dailyTaskIndex: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  categoryConfig,
  onAddDailyTask,
  onToggleDailyTask,
}) => {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [newDailyTask, setNewDailyTask] = useState('');

  if (todos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          {categoryConfig.icon} No tasks yet! Time to get productive! 🚀
        </Typography>
      </Box>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleAddDailyTask = (monthlyTaskId: string) => {
    if (newDailyTask.trim() && onAddDailyTask) {
      onAddDailyTask(monthlyTaskId, newDailyTask.trim());
      setNewDailyTask('');
    }
  };

  return (
    <List>
      {todos.map((todo) => (
        <React.Fragment key={todo.id}>
          <ListItem
            sx={{
              mb: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Checkbox
              edge="start"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              sx={{ color: categoryConfig.color }}
            />
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? 'text.secondary' : 'text.primary',
                      fontSize: todo.category === 'Prayers' ? '1.1rem' : '1rem',
                      fontWeight: todo.category === 'Prayers' ? 500 : 400,
                    }}
                  >
                    {todo.text}
                  </Typography>
                  {todo.prayerTime && (
                    <Chip
                      size="small"
                      label={todo.prayerTime}
                      icon={<span>{categoryConfig.subCategories?.[todo.prayerTime]?.icon}</span>}
                      sx={{
                        bgcolor: categoryConfig.subCategories?.[todo.prayerTime]?.color || 'primary.light',
                        color: 'white',
                        fontWeight: 500,
                        '& .MuiChip-icon': {
                          color: 'white',
                          fontSize: '1.1rem',
                        },
                      }}
                    />
                  )}
                  {todo.dueDate && (
                    <Chip
                      size="small"
                      label={`Due: ${formatDate(todo.dueDate)}`}
                      icon={<span>📅</span>}
                      sx={{ bgcolor: 'secondary.light', color: 'white' }}
                    />
                  )}
                  {todo.type === 'Monthly' && todo.progress !== undefined && (
                    <Chip
                      size="small"
                      label={`${Math.round(todo.progress)}%`}
                      sx={{ bgcolor: 'success.light', color: 'white' }}
                    />
                  )}
                </Box>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {todo.category === 'Prayers' ? (
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <span>{categoryConfig.subCategories?.[todo.prayerTime!]?.icon}</span>
                      {categoryConfig.subCategories?.[todo.prayerTime!]?.description}
                    </Box>
                  ) : (
                    `Created: ${formatDate(todo.createdAt)}`
                  )}
                </Typography>
              }
            />
            {todo.type === 'Monthly' && (
              <IconButton
                onClick={() => setExpandedTask(expandedTask === todo.id ? null : todo.id)}
                sx={{ mr: 1 }}
              >
                {expandedTask === todo.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
            {onDelete && (
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(todo.id)}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
          {todo.type === 'Monthly' && (
            <Collapse in={expandedTask === todo.id}>
              <Box sx={{ pl: 4, pr: 2, pb: 2 }}>
                {todo.progress !== undefined && (
                  <LinearProgress
                    variant="determinate"
                    value={todo.progress}
                    sx={{ mb: 2, height: 8, borderRadius: 4 }}
                  />
                )}
                <List dense>
                  {todo.dailyTasks?.map((task, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <Checkbox
                        size="small"
                        checked={todo.completedDailyTasks?.includes(task)}
                        onChange={() => onToggleDailyTask?.(todo.id, index)}
                      />
                      <ListItemText
                        primary={task}
                        sx={{
                          textDecoration: todo.completedDailyTasks?.includes(task) ? 'line-through' : 'none',
                          color: todo.completedDailyTasks?.includes(task) ? 'text.secondary' : 'text.primary',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Add daily task..."
                    value={newDailyTask}
                    onChange={(e) => setNewDailyTask(e.target.value)}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddDailyTask(todo.id)}
                    disabled={!newDailyTask.trim()}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default TodoList; 