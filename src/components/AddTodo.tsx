import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { Category } from '../types';

interface AddTodoProps {
  onAdd: (text: string, category: Category) => void;
  selectedCategory: Category;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd, selectedCategory }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), selectedCategory);
      setText('');
    }
  };

  const getPlaceholder = () => {
    switch (selectedCategory) {
      case 'Home':
        return 'e.g., Clean the dragon\'s lair (my room) 🐉';
      case 'Learning':
        return 'e.g., Master the art of coding like a wizard 🧙‍♂️';
      case 'Prayers':
        return 'e.g., Take a moment to breathe and be grateful 🌟';
      default:
        return 'Add a new task...';
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {getPlaceholder()}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          variant="outlined"
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!text.trim()}
        >
          Add Task
        </Button>
      </Box>
    </Box>
  );
};

export default AddTodo; 