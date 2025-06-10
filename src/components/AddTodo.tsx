import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { Category, CategoryConfig } from '../types';

interface AddTodoProps {
  onAdd: (text: string, category: Category, subCategory?: string) => void;
  selectedCategory: Category;
  selectedSubCategory: string;
  onSubCategoryChange: (subCategory: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({
  onAdd,
  selectedCategory,
  selectedSubCategory,
  onSubCategoryChange,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), selectedCategory, selectedSubCategory);
      setText('');
    }
  };

  const getPlaceholder = () => {
    const config = categoryConfigs[selectedCategory];
    if (selectedCategory === 'Learning') {
      if (selectedSubCategory === 'monthly') {
        return 'e.g., Complete React course by end of month 📚';
      }
      return 'e.g., Practice coding for 2 hours today 💻';
    }
    if (selectedCategory === 'Prayers' && selectedSubCategory) {
      return `e.g., ${selectedSubCategory} prayer reminder - ${config.subCategories?.[selectedSubCategory]?.description}`;
    }
    return 'e.g., Clean the dragon\'s lair (my room) 🐉';
  };

  const renderSubCategorySelector = () => {
    const config = categoryConfigs[selectedCategory];
    if (!config.subCategories) return null;

    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Select Type:
        </Typography>
        <ToggleButtonGroup
          value={selectedSubCategory}
          exclusive
          onChange={(_, value) => onSubCategoryChange(value)}
          size="small"
          sx={{ mb: 1 }}
        >
          {Object.entries(config.subCategories).map(([key, subConfig]) => (
            <ToggleButton
              key={key}
              value={key}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              }}
            >
              {subConfig.icon} {key}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {renderSubCategorySelector()}
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