import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Paper } from '@mui/material';
import { DailyProgress } from '../types';

interface ProgressTrackerProps {
  dailyProgress: DailyProgress;
}

const motivationalMessages = [
  "You're crushing it! 🚀",
  "Level up! ⭐",
  "Amazing progress! 🌟",
  "You're on fire! 🔥",
  "Keep up the great work! 💪",
  "You're unstoppable! 🏃‍♂️",
  "Fantastic job! 🎯",
  "You're a star! ⭐",
  "Incredible work! 🌈",
  "You're making it happen! 🎉"
];

const celebrationEmojis = ['🎉', '🎊', '🌟', '⭐', '🎯', '🏆', '💪', '🚀'];

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ dailyProgress }) => {
  const [message, setMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState(false);
  const [celebration, setCelebration] = useState<string[]>([]);

  useEffect(() => {
    if (dailyProgress.completedTasks > 0) {
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      setMessage(randomMessage);
      setShowMessage(true);

      // Show celebration emojis when all tasks are completed
      if (dailyProgress.completedTasks === dailyProgress.totalTasks && dailyProgress.totalTasks > 0) {
        const emojis = Array.from({ length: 5 }, () => 
          celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)]
        );
        setCelebration(emojis);
      }

      // Hide message after 3 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
        setCelebration([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [dailyProgress.completedTasks, dailyProgress.totalTasks]);

  const progressPercentage = dailyProgress.totalTasks > 0
    ? (dailyProgress.completedTasks / dailyProgress.totalTasks) * 100
    : 0;

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3, bgcolor: 'background.paper' }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Today's Progress
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ flexGrow: 1, mr: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progressPercentage}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                },
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {Math.round(progressPercentage)}%
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {dailyProgress.completedTasks} of {dailyProgress.totalTasks} tasks completed
          </Typography>
          <Typography variant="h6" color="primary">
            {dailyProgress.points} points
          </Typography>
        </Box>
      </Box>
      {showMessage && (
        <Box
          sx={{
            mt: 2,
            p: 1,
            bgcolor: 'primary.light',
            color: 'white',
            borderRadius: 1,
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease-in',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(-10px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Typography variant="body1">{message}</Typography>
          {celebration.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                mt: 1,
                animation: 'bounce 1s infinite',
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-10px)' },
                },
              }}
            >
              {celebration.map((emoji, index) => (
                <Typography
                  key={index}
                  variant="h5"
                  sx={{
                    animation: `bounce ${0.5 + index * 0.1}s infinite`,
                  }}
                >
                  {emoji}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default ProgressTracker; 