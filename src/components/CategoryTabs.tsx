import React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { Category, CategoryConfig } from '../types';

interface CategoryTabsProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  categoryConfigs: Record<Category, CategoryConfig>;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onCategoryChange,
  categoryConfigs,
}) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={selectedCategory}
        onChange={(_, newValue) => onCategoryChange(newValue)}
        variant="fullWidth"
        sx={{
          '& .MuiTab-root': {
            fontSize: '1.1rem',
            fontWeight: 'bold',
          },
        }}
      >
        {Object.entries(categoryConfigs).map(([category, config]) => (
          <Tab
            key={category}
            value={category}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>{config.icon}</span>
                <Typography variant="body1">{category}</Typography>
              </Box>
            }
            sx={{
              color: selectedCategory === category ? config.color : 'text.secondary',
              '&.Mui-selected': {
                color: config.color,
              },
            }}
          />
        ))}
      </Tabs>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, textAlign: 'center' }}
      >
        {categoryConfigs[selectedCategory].description}
      </Typography>
    </Box>
  );
};

export default CategoryTabs; 