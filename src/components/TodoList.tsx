import React from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo, CategoryConfig } from '../types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  categoryConfig: CategoryConfig;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  categoryConfig,
}) => {
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

  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
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
                  }}
                >
                  {todo.text}
                </Typography>
                {todo.prayerTime && (
                  <Chip
                    size="small"
                    label={todo.prayerTime}
                    icon={<span>{categoryConfig.subCategories?.[todo.prayerTime]?.icon}</span>}
                    sx={{ bgcolor: 'primary.light', color: 'white' }}
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
              </Box>
            }
            secondary={
              <Typography variant="body2" color="text.secondary">
                Created: {formatDate(todo.createdAt)}
              </Typography>
            }
          />
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
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList; 