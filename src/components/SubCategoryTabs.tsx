import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Category, CategoryConfig } from '../types';

interface SubCategoryTabsProps {
  selectedCategory: Category;
  selectedSubCategory: string;
  onSubCategoryChange: (subCategory: string) => void;
  categoryConfigs: Record<Category, CategoryConfig>;
}

const SubCategoryTabs: React.FC<SubCategoryTabsProps> = ({
  selectedCategory,
  selectedSubCategory,
  onSubCategoryChange,
  categoryConfigs,
}) => {
  const subCategories = categoryConfigs[selectedCategory]?.subCategories || {};

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={selectedSubCategory}
        onChange={(_, newValue) => onSubCategoryChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {Object.entries(subCategories).map(([key, config]) => (
          <Tab
            key={key}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>{config.icon}</span>
                <span>{key}</span>
              </Box>
            }
            value={key}
            sx={{
              color: 'text.secondary',
              '&.Mui-selected': {
                color: categoryConfigs[selectedCategory].color,
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default SubCategoryTabs; 