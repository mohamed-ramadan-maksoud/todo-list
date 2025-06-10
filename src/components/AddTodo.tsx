import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!text.trim()}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddTodo; 